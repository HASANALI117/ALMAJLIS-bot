import { Client, GatewayIntentBits, Collection } from "discord.js";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { CommandKit } from "commandkit";
import mongoose from "mongoose";

dotenv.config({ path: "../.env" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Bot connected to MongoDB"))
  .catch((err) => {
    console.error("Bot failed to connect to MongoDB", err);
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
});

client.login(process.env.DISCORD_BOT_TOKEN);
