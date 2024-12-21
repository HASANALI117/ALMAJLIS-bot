module.exports = {
  name: "shutup",
  description:
    "Listen for the words 'hi' or 'hello' and respond with 'SHUTUP'.",
  execute(client) {
    client.on("messageCreate", (message) => {
      const content = message.content.toLowerCase();

      if (content.includes("hi") || content.includes("hello")) {
        message.reply("SHUTUP");
      }
    });
  },
};
