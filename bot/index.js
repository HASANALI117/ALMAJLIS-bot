import { Client, GatewayIntentBits, Collection } from "discord.js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config({ path: "../.env" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
  ],
});

client.commands = new Collection();
client.prefix = "!";

// Load commands
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const { default: command } = await import(
    `file://${path.join(commandsPath, file)}`
  );
  client.commands.set(command.name, command);
}

// Load events
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const { default: event } = await import(
    `file://${path.join(eventsPath, file)}`
  );
  client.on(event.name, (...args) => event.execute(client, ...args));
}

client.login(process.env.TOKEN);
