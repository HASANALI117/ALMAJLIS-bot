import WelcomeSettings from "../../models/WelcomeSettings.js";
import { EmbedBuilder } from "discord.js";

export default async (member) => {
  try {
    console.log(
      `New member joined: ${member.user.username} in ${member.guild.name}`
    );

    // Fetch welcome settings from database
    const welcomeSettings = await WelcomeSettings.findOne({
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

    // Helper function to replace placeholders
    const replacePlaceholders = (text) => {
      return text
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
    };

    if (welcomeSettings.useEmbed && welcomeSettings.embed) {
      // Create embed message
      const embed = new EmbedBuilder();

      // Set embed properties
      if (welcomeSettings.embed.title) {
        embed.setTitle(replacePlaceholders(welcomeSettings.embed.title));
      }

      if (welcomeSettings.embed.description) {
        embed.setDescription(
          replacePlaceholders(welcomeSettings.embed.description)
        );
      }

      if (welcomeSettings.embed.color) {
        embed.setColor(welcomeSettings.embed.color);
      }

      if (welcomeSettings.embed.thumbnail && member.user.displayAvatarURL) {
        embed.setThumbnail(member.user.displayAvatarURL({ dynamic: true }));
      }

      if (welcomeSettings.embed.footer?.text) {
        embed.setFooter({
          text: replacePlaceholders(welcomeSettings.embed.footer.text),
          iconURL: welcomeSettings.embed.footer.iconURL || undefined,
        });
      }

      if (welcomeSettings.embed.author?.name) {
        embed.setAuthor({
          name: replacePlaceholders(welcomeSettings.embed.author.name),
          iconURL: welcomeSettings.embed.author.iconURL || undefined,
        });
      }

      // Add fields if they exist
      if (
        welcomeSettings.embed.fields &&
        welcomeSettings.embed.fields.length > 0
      ) {
        welcomeSettings.embed.fields.forEach((field) => {
          if (field.name && field.value) {
            embed.addFields({
              name: replacePlaceholders(field.name),
              value: replacePlaceholders(field.value),
              inline: field.inline || false,
            });
          }
        });
      }

      // Send embed message
      await channel.send({ embeds: [embed] });
      console.log(`Welcome embed sent to ${member.user.username}`);
    } else if (welcomeSettings.message) {
      // Send simple text message
      const message = replacePlaceholders(welcomeSettings.message);
      await channel.send(message);
      console.log(`Welcome message sent to ${member.user.username}`);
    }
  } catch (error) {
    console.error("Error in guildMemberAdd event:", error);
  }
};
