import Redis from "ioredis";
import { processWebhookNotification } from "./dealNotificationProcessor.js";

let redisSubscriber = null;
let discordClient = null;

export function initializeRedisSubscriber(client) {
  discordClient = client;

  try {
    console.log("🔄 Initializing Redis subscriber...");
    console.log(
      "Redis URL:",
      process.env.REDIS_URL || "redis://localhost:6379"
    );

    redisSubscriber = new Redis(
      process.env.REDIS_URL || "redis://localhost:6379",
      {
        retryDelayOnFailover: 100,
        maxRetriesPerRequest: 3,
        lazyConnect: false, // Immediately connect
        enableReadyCheck: true,
      }
    );

    redisSubscriber.on("connect", () => {
      console.log("✅ Bot connected to Redis");
    });

    redisSubscriber.on("error", (error) => {
      console.error("❌ Bot Redis connection error:", error);
    });

    redisSubscriber.on("ready", () => {
      console.log("🚀 Bot Redis is ready");
      setupSubscriptions();
    });

    redisSubscriber.on("close", () => {
      console.log("🔌 Bot Redis connection closed");
    });

    redisSubscriber.on("reconnecting", () => {
      console.log("🔄 Bot Redis reconnecting...");
    });

    // Don't force connect since lazyConnect is false
    // The connection will happen automatically

    return redisSubscriber;
  } catch (error) {
    console.error("❌ Failed to initialize Redis subscriber:", error);
    throw error;
  }
}

function setupSubscriptions() {
  console.log("📡 Setting up Redis subscriptions...");

  // Subscribe to multiple channels
  const channels = ["game-deals", "webhook-events"];

  redisSubscriber.subscribe(...channels, (err, count) => {
    if (err) {
      console.error("❌ Failed to subscribe to Redis channels:", err);
      return;
    }
    console.log(
      `✅ Subscribed to ${count} Redis channels: ${channels.join(", ")}`
    );

    // Use async/await instead of callback for sendCommand
    checkActiveChannels();
  });

  // Handle incoming messages
  redisSubscriber.on("message", async (channel, message) => {
    try {
      console.log(`📨 Received message on channel: ${channel}`);
      console.log(`📄 Raw message: ${message}`);

      const parsedMessage = JSON.parse(message);
      console.log(`🔔 Processing message type: ${parsedMessage.type}`);
      console.log(`📊 Message data:`, parsedMessage);

      if (
        channel === "game-deals" &&
        parsedMessage.type === "deal-notification"
      ) {
        console.log("🎮 Processing deal notification...");
        await processWebhookNotification(parsedMessage.data, discordClient);
      } else if (
        channel === "webhook-events" &&
        parsedMessage.type === "ping-event"
      ) {
        console.log("🏓 Processing ping event...");
        await processPingEvent(parsedMessage.data, discordClient);
      } else {
        console.log(
          `⚠️ Unknown message type or channel: ${channel}/${parsedMessage.type}`
        );
      }
    } catch (error) {
      console.error("❌ Error processing Redis message:", error);
      console.error("❌ Error details:", error.stack);
    }
  });

  // Handle subscription events
  redisSubscriber.on("subscribe", (channel, count) => {
    console.log(
      `✅ Successfully subscribed to channel: ${channel} (total: ${count})`
    );
  });

  redisSubscriber.on("unsubscribe", (channel, count) => {
    console.log(
      `❌ Unsubscribed from channel: ${channel} (remaining: ${count})`
    );
  });
}

// Fixed function to check active channels
async function checkActiveChannels() {
  try {
    const result = await redisSubscriber.sendCommand(["PUBSUB", "CHANNELS"]);
    console.log("📋 Active Redis channels:", result);
  } catch (error) {
    console.error("❌ Error checking active channels:", error);
  }
}

async function processPingEvent(pingData, discordClient) {
  try {
    console.log(`🏓 Received ping event from webhook: ${pingData.hookId}`);
    console.log(`   Payload: ${pingData.payload}`);
    console.log(`   Timestamp: ${pingData.timestamp}`);

    // For testing purposes, you could send a message to a specific test channel
    // Uncomment and configure the following if you want Discord notifications for ping events:

    const testGuildId = process.env.GUILD_ID;
    const testChannelId = process.env.CHANNEL_ID;

    if (testGuildId && testChannelId) {
      console.log(
        `🎯 Attempting to send ping notification to guild: ${testGuildId}, channel: ${testChannelId}`
      );

      const guild = discordClient.guilds.cache.get(testGuildId);
      if (guild) {
        console.log(`✅ Found guild: ${guild.name}`);
        const channel = guild.channels.cache.get(testChannelId);
        if (channel) {
          console.log(`✅ Found channel: ${channel.name}`);
          await channel.send(
            `🏓 Ping received from webhook: \`${pingData.hookId}\` with payload: \`${pingData.payload}\``
          );
          console.log(`✅ Ping notification sent successfully!`);
        } else {
          console.error(`❌ Channel not found: ${testChannelId}`);
        }
      } else {
        console.error(`❌ Guild not found: ${testGuildId}`);
      }
    } else {
      console.log(`⚠️ Test guild or channel ID not configured`);
    }
  } catch (error) {
    console.error("❌ Error processing ping event:", error);
    console.error("❌ Error details:", error.stack);
  }
}

export function closeRedisSubscriber() {
  if (redisSubscriber) {
    redisSubscriber.disconnect();
    redisSubscriber = null;
    console.log("🔌 Redis subscriber disconnected");
  }
}
