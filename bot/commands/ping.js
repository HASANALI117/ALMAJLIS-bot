module.exports = {
  name: "ping",
  description: "This command will respond with Pong!",
  execute(message) {
    message.reply("Pong!");
  },
};
