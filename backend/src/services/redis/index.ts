import Redis from "ioredis";

let redisClient: Redis | null = null;

export const initializeRedis = () => {
  try {
    redisClient = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });

    redisClient.on("connect", () => {
      console.log("✅ Connected to Redis");
    });

    redisClient.on("error", (error) => {
      console.error("❌ Redis connection error:", error);
    });

    redisClient.on("ready", () => {
      console.log("🚀 Redis is ready");
    });

    return redisClient;
  } catch (error) {
    console.error("❌ Failed to initialize Redis:", error);
    throw error;
  }
};

export const getRedisClient = (): Redis => {
  if (!redisClient) {
    throw new Error(
      "Redis client not initialized. Call initializeRedis() first."
    );
  }
  return redisClient;
};

export const publishDealNotification = async (dealAlert: any) => {
  try {
    const client = getRedisClient();

    const message = {
      type: "deal-notification",
      timestamp: new Date().toISOString(),
      data: dealAlert,
    };

    await client.publish("game-deals", JSON.stringify(message));
    console.log(`📢 Published deal notification to Redis: ${dealAlert.hookId}`);

    return true;
  } catch (error) {
    console.error("❌ Failed to publish deal notification:", error);
    return false;
  }
};

export const publishPingEvent = async (pingData: any) => {
  try {
    const client = getRedisClient();

    const message = {
      type: "ping-event",
      timestamp: new Date().toISOString(),
      data: pingData,
    };

    await client.publish("webhook-events", JSON.stringify(message));
    console.log(`🏓 Published ping event to Redis: ${pingData.hookId}`);

    return true;
  } catch (error) {
    console.error("❌ Failed to publish ping event:", error);
    return false;
  }
};

export const closeRedisConnection = async () => {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
    console.log("🔌 Redis connection closed");
  }
};
