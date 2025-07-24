import Redis from "ioredis";
import {
  MESSAGE_TYPES,
  REDIS_CHANNELS,
  REDIS_CONFIG,
} from "../../utils/constants";

let redisClient: Redis | null = null;

/**
 * Initialize Redis client connection
 */
export const initializeRedis = (): Redis => {
  try {
    if (redisClient) {
      console.log("⚠️ Redis client already initialized");
      return redisClient;
    }

    const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

    redisClient = new Redis(redisUrl, REDIS_CONFIG);

    redisClient.on("connect", () => {
      console.log("✅ Connected to Redis");
    });

    redisClient.on("error", (error) => {
      console.error("❌ Redis connection error:", error);
    });

    redisClient.on("ready", () => {
      console.log("🚀 Redis is ready");
    });

    redisClient.on("close", () => {
      console.log("🔌 Redis connection closed");
    });

    redisClient.on("reconnecting", () => {
      console.log("🔄 Redis reconnecting...");
    });

    return redisClient;
  } catch (error) {
    console.error("❌ Failed to initialize Redis:", error);
    throw error;
  }
};

/**
 * Get Redis client instance
 */
export const getRedisClient = (): Redis => {
  if (!redisClient) {
    throw new Error(
      "Redis client not initialized. Call initializeRedis() first."
    );
  }
  return redisClient;
};

/**
 * Publish deal notification to Redis
 */
export const publishDealNotification = async (
  dealAlert: any
): Promise<boolean> => {
  try {
    const client = getRedisClient();

    const message = {
      type: MESSAGE_TYPES.DEAL_NOTIFICATION,
      timestamp: new Date().toISOString(),
      data: dealAlert,
    };

    await client.publish(REDIS_CHANNELS.GAME_DEALS, JSON.stringify(message));
    console.log(`📢 Published deal notification to Redis: ${dealAlert.hookId}`);

    return true;
  } catch (error) {
    console.error("❌ Failed to publish deal notification:", error);
    return false;
  }
};

/**
 * Publish ping event to Redis for testing
 */
export const publishPingEvent = async (pingData: any): Promise<boolean> => {
  try {
    const client = getRedisClient();

    const message = {
      type: MESSAGE_TYPES.PING_EVENT,
      timestamp: new Date().toISOString(),
      data: pingData,
    };

    await client.publish(
      REDIS_CHANNELS.WEBHOOK_EVENTS,
      JSON.stringify(message)
    );
    console.log(`🏓 Published ping event to Redis: ${pingData.hookId}`);

    return true;
  } catch (error) {
    console.error("❌ Failed to publish ping event:", error);
    return false;
  }
};

/**
 * Health check for Redis connection
 */
export const checkRedisHealth = async (): Promise<boolean> => {
  try {
    const client = getRedisClient();
    const result = await client.ping();
    return result === "PONG";
  } catch (error) {
    console.error("❌ Redis health check failed:", error);
    return false;
  }
};

/**
 * Close Redis connection gracefully
 */
export const closeRedisConnection = async (): Promise<void> => {
  if (redisClient) {
    try {
      await redisClient.quit();
      redisClient = null;
      console.log("🔌 Redis connection closed gracefully");
    } catch (error) {
      console.error("❌ Error closing Redis connection:", error);
      redisClient = null;
    }
  }
};

/**
 * Get Redis connection statistics
 */
export const getRedisStats = async (): Promise<any> => {
  try {
    const client = getRedisClient();
    const info = await client.info();
    return {
      connected: client.status === "ready",
      status: client.status,
      info: info,
    };
  } catch (error) {
    console.error("❌ Failed to get Redis stats:", error);
    return null;
  }
};
