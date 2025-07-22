import {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} from "discord.js";
import GameAlert from "../../models/GameAlert.js";

export const data = new SlashCommandBuilder()
  .setName("gamedeals-list")
  .setDescription("List all your active game deal alerts");

export async function run({ interaction, client }) {
  try {
    const alerts = await GameAlert.find({
      guildId: interaction.guild.id,
      createdBy: interaction.user.id,
      isActive: true,
    }).sort({ createdAt: -1 });

    if (alerts.length === 0) {
      return interaction.reply({
        content: "📭 You don't have any active game alerts.",
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle("🎮 Your Active Game Alerts")
      .setColor("#5865F2")
      .setDescription(`You have ${alerts.length}/5 active alerts`)
      .setTimestamp();

    alerts.forEach((alert, index) => {
      const lastNotified = alert.lastNotified
        ? `<t:${Math.floor(alert.lastNotified.getTime() / 1000)}:R>`
        : "Never";

      embed.addFields({
        name: `${index + 1}. ${alert.gameTitle}`,
        value: `💰 Max Price: $${alert.maxPrice} | 📊 Min Discount: ${alert.minDiscountPercent}%\n📢 Channel: <#${alert.channelId}> | 🔔 Last: ${lastNotified}`,
        inline: false,
      });
    });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  } catch (error) {
    console.error("Error listing game alerts:", error);
    await interaction.reply({
      content: "❌ An error occurred while fetching your alerts.",
      ephemeral: true,
    });
  }
}

export const options = {
  userPermissions: [],
  botPermissions: [
    PermissionFlagsBits.SendMessages,
    PermissionFlagsBits.EmbedLinks,
  ],
};
