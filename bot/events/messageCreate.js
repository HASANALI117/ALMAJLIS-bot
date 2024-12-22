module.exports = {
  name: "messageCreate",
  execute(client, message) {
    // Ignore bot messages
    if (message.author.bot) return;

    const content = message.content.toLowerCase();

    // Listen for "hi" or "hello" and respond with "SHUTUP"
    if (content.includes("hi") || content.includes("hello")) {
      message.reply("SHUTUP");
      return; // Stop further processing
    }

    // Command handling (for prefixed commands like !ping)
    if (!message.content.startsWith(client.prefix)) return;

    // Remove the prefix and split the message content into arguments
    const args = message.content.slice(client.prefix.length).trim().split(/ +/);
    // Extract the command name from the arguments
    const commandName = args.shift().toLowerCase();

    // Get the command from the client's command collection
    const command = client.commands.get(commandName);

    // If the command doesn't exist, return
    if (!command) return;

    try {
      // Execute the command with the message and arguments
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply("There was an error executing that command.");
    }
  },
};
