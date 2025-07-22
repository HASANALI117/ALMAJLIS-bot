import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import GameAlert from "../../models/GameAlert.js";

export const data = new SlashCommandBuilder()
  .setName("gamedeals-remove")
  .setDescription("Remove a game deal alert")
  .addStringOption((option) =>
    option
      .setName("game")
      .setDescription("Name of the game to stop watching")
      .setRequired(true)
  );

export async function run({ interaction, client }) {
  const game = interaction.options.getString("game");

  try {
    const alert = await GameAlert.findOneAndDelete({
      guildId: interaction.guild.id,
      gameTitle: { $regex: game, $options: "i" },
      createdBy: interaction.user.id,
      isActive: true,
    });

    if (!alert) {
      return interaction.reply({
        content: `❌ Could not find an active alert for "${game}".`,
        ephemeral: true,
      });
    }

    await interaction.reply({
      content: `✅ Removed game alert for **${alert.gameTitle}**.`,
      ephemeral: true,
    });
  } catch (error) {
    console.error("Error removing game alert:", error);
    await interaction.reply({
      content: "❌ An error occurred while removing the alert.",
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
