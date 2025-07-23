import { Client, GatewayIntentBits, Collection } from "discord.js";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { CommandKit } from "commandkit";
import mongoose from "mongoose";
import {
  initializeRedisSubscriber,
  closeRedisSubscriber,
} from "./services/redisSubscriber.js";

dotenv.config({ path: "../.env" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🤖 Starting Discord bot...");
console.log("Environment check:");
console.log(
  "- DISCORD_BOT_TOKEN:",
  process.env.DISCORD_BOT_TOKEN ? "✅ Set" : "❌ Missing"
);
console.log(
  "- MONGODB_URI:",
  process.env.MONGODB_URI ? "✅ Set" : "❌ Missing"
);
console.log("- REDIS_URL:", process.env.REDIS_URL ? "✅ Set" : "❌ Missing");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Bot connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ Bot failed to connect to MongoDB", err);
    process.exit(1);
  });

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
  ],
});

new CommandKit({
  client,
  commandsPath: path.join(__dirname, "commands"),
  eventsPath: path.join(__dirname, "events"),
  bulkRegister: true,
});

// Initialize Redis subscriber when client is ready
client.once("ready", () => {
  console.log(`✅ Bot logged in as ${client.user.tag}`);
  console.log("🔄 Initializing Redis subscriber...");

  try {
    initializeRedisSubscriber(client);
    console.log("✅ Redis subscriber initialization attempted");
  } catch (error) {
    console.error("❌ Failed to initialize Redis subscriber:", error);
  }
});

// Add some debugging for client events
client.on("error", (error) => {
  console.error("❌ Discord client error:", error);
});

client.on("warn", (warning) => {
  console.warn("⚠️ Discord client warning:", warning);
});

client.on("disconnect", () => {
  console.log("🔌 Discord client disconnected");
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("🔄 Shutting down bot...");
  closeRedisSubscriber();
  client.destroy();
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("🔄 Shutting down bot (SIGTERM)...");
  closeRedisSubscriber();
  client.destroy();
  process.exit(0);
});

client.login(process.env.DISCORD_BOT_TOKEN);
