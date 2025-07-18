import LeaveSettings from "../../models/LeaveSettings.js";
import { EmbedBuilder } from "discord.js";

export default async (member) => {
  try {
    console.log(
      `Member left: ${member.user.username} from ${member.guild.name}`
    );

    // Fetch leave settings from database
    const leaveSettings = await LeaveSettings.findOne({
      guildId: member.guild.id,
    });

    if (!leaveSettings || !leaveSettings.enabled) {
      console.log(
        `Leave settings are disabled for guild: ${member.guild.name}`
      );
      return;
    }

    // Get the channel from the guild
    const channel = member.guild.channels.cache.get(leaveSettings.channelId);
    if (!channel) {
      console.log(`Leave channel not found: ${leaveSettings.channelId}`);
      return;
    }

    // Helper function to replace placeholders
    const replacePlaceholders = (text) => {
      return text
        .replace(/{user}/g, `${member.user.username}`)
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

    if (leaveSettings.useEmbed && leaveSettings.embed) {
      // Create embed message - similar to welcome but for leaving
      const embed = new EmbedBuilder();

      if (leaveSettings.embed.title) {
        embed.setTitle(replacePlaceholders(leaveSettings.embed.title));
      }

      if (leaveSettings.embed.description) {
        embed.setDescription(
          replacePlaceholders(leaveSettings.embed.description)
        );
      }

      if (leaveSettings.embed.color) {
        embed.setColor(leaveSettings.embed.color);
      }

      if (leaveSettings.embed.thumbnail && member.user.displayAvatarURL) {
        embed.setThumbnail(member.user.displayAvatarURL({ dynamic: true }));
      }

      if (leaveSettings.embed.footer?.text) {
        embed.setFooter({
          text: replacePlaceholders(leaveSettings.embed.footer.text),
          iconURL: leaveSettings.embed.footer.iconURL || undefined,
        });
      }

      if (leaveSettings.embed.author?.name) {
        embed.setAuthor({
          name: replacePlaceholders(leaveSettings.embed.author.name),
          iconURL: leaveSettings.embed.author.iconURL || undefined,
        });
      }

      if (leaveSettings.embed.fields && leaveSettings.embed.fields.length > 0) {
        leaveSettings.embed.fields.forEach((field) => {
          if (field.name && field.value) {
            embed.addFields({
              name: replacePlaceholders(field.name),
              value: replacePlaceholders(field.value),
              inline: field.inline || false,
            });
          }
        });
      }

      await channel.send({ embeds: [embed] });
      console.log(`Leave embed sent for ${member.user.username}`);
    } else if (leaveSettings.message) {
      const message = replacePlaceholders(leaveSettings.message);
      await channel.send(message);
      console.log(`Leave message sent for ${member.user.username}`);
    }
  } catch (error) {
    console.error("Error in guildMemberRemove event:", error);
  }
};
