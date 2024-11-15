const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
const cron = require("node-cron");

const TOKEN = process.env.TOKEN;
const HUSAIN_ID = process.env.HUSAIN_ID;
const HASAN_ID = process.env.HASAN_ID;
const AMMAR_ID = process.env.AMMAR_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once("ready", () => {
  console.log("Bot is online.");
});

// Welcome message functionality
client.on("guildMemberAdd", (member) => {
  // Specify the channel name where welcome messages will be sent
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === "welcome"
  );

  // Check if the welcome channel exists
  if (!channel) return;

  // Send a welcome message, mentioning the new member
  channel.send(
    `Welcome to the server, ${member}! 🎉 We’re glad to have you here.`
  );
});

// Schedule a task to run at 1 AM every day
cron.schedule("30 1 * * *", () => {
  const guild = client.guilds.cache.first();
  const member = guild.members.cache.get(HUSAIN_ID);

  if (member && member.presence && member.presence.status !== "offline") {
    const channel = guild.channels.cache.find((ch) => ch.name === "commands");
    if (channel) {
      channel.send(`GO SLEEP <@${HUSAIN_ID}>!`);
    }
  }
});

// Schedule a task to run at 4:45 AM every day
cron.schedule("30 5 * * *", () => {
  const guild = client.guilds.cache.first();
  const member1 = guild.members.cache.get(HASAN_ID);
  const member2 = guild.members.cache.get(HUSAIN_ID);
  const member3 = guild.members.cache.get(AMMAR_ID);

  const channel = guild.channels.cache.find((ch) => ch.name === "commands");
  if (channel) {
    if (member1 && member2 && member3) {
      channel.send(`I enter: <@${HASAN_ID}>, <@${HUSAIN_ID}>, <@${AMMAR_ID}>!`);
    }
  }
});

client.on("messageCreate", (message) => {
  if (message.content.toLowerCase() === "hi") {
    message.channel.send("SHUTUP");
  }
});

client.login(TOKEN);
