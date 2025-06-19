import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import AutoRole from "../../models/AutoRole.js";

export const data = new SlashCommandBuilder()
  .setName("autorole-disable")
  .setDescription("Disable the auto role feature for the server.")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function run({ interaction }) {
  try {
    const guildId = interaction.guild.id;

    // Check if auto role is currently configured
    const autoRoleConfig = await AutoRole.findOne({ guildId });

    if (!autoRoleConfig) {
      return interaction.reply({
        content: "❌ Auto role is not currently configured for this server.",
        ephemeral: true,
      });
    }

    // Remove the auto role configuration from the database
    await AutoRole.findOneAndDelete({ guildId });

    await interaction.reply({
      content: "✅ Auto role feature has been disabled for this server.",
      ephemeral: true,
    });
  } catch (error) {
    console.error("Error in autorole-disable command:", error);
    await interaction.reply({
      content:
        "❌ An error occurred while disabling the auto role feature. Please try again.",
      ephemeral: true,
    });
  }
}
