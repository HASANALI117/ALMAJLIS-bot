const cron = require("node-cron");

// Schedule a task to run at 1 AM every day
module.exports = (client) => {
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
        channel.send(
          `I enter: <@${HASAN_ID}>, <@${HUSAIN_ID}>, <@${AMMAR_ID}>!`
        );
      }
    }
  });
};
