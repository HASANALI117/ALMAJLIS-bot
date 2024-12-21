// Welcome message functionality
module.exports = {
  name: "Welcome message",
  description:
    "Sends a welcome message to a specified channel when a new member joins.",
  execute(client) {
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
  },
};
