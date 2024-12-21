module.exports = {
  name: "ready",
  execute(client) {
    console.log(`Bot is Online. Logged in as ${client.user.tag}`);
  },
};
