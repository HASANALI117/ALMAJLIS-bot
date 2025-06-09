import WelcomeChannel from "../../models/WelcomeChannel.js";

export default async (member) => {
  try {
    console.log(
      `New member joined: ${member.user.username} in ${member.guild.name}`
    );

    // Fetch welcome settings from database
    const welcomeSettings = await WelcomeChannel.findOne({
      guildId: member.guild.id,
    });

    if (!welcomeSettings) {
      console.log(`No welcome settings found for guild: ${member.guild.name}`);
      return;
    }

    // Get the channel from the guild
    const channel = member.guild.channels.cache.get(welcomeSettings.channelId);
    if (!channel) {
      console.log(`Welcome channel not found: ${welcomeSettings.channelId}`);
      return;
    }

    // Use custom message or default
    let message =
      welcomeSettings.message || "Welcome to the server, {user}! 🎉";

    // Replace placeholders
    message = message
      .replace(/{user}/g, `<@${member.user.id}>`)
      .replace(/{username}/g, member.user.username)
      .replace(/{server}/g, member.guild.name)
      .replace(/{membercount}/g, member.guild.memberCount.toString())
      .replace(/{channel:(\w+)}/g, (match, channelName) => {
        const foundChannel = member.guild.channels.cache.find(
          (ch) => ch.name === channelName
        );
        return foundChannel ? `<#${foundChannel.id}>` : `#${channelName}`;
      });

    // Send the welcome message
    await channel.send(message);
    console.log(`Welcome message sent to ${member.user.username}`);
  } catch (error) {
    console.error("Error in guildMemberAdd event:", error);
  }
};
