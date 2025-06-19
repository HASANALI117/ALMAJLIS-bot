import {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import AutoRole from "../../models/AutoRole.js";

export const data = new SlashCommandBuilder()
  .setName("autorole-configure")
  .setDescription("Configure the auto role for the server.")
  .addRoleOption((option) =>
    option
      .setName("role")
      .setDescription("The role to assign automatically to new members.")
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function run({ interaction }) {
  try {
    const role = interaction.options.getRole("role");
    const guildId = interaction.guild.id;

    // Check if the bot can manage the role
    const botMember = interaction.guild.members.me;
    if (role.position >= botMember.roles.highest.position) {
      return interaction.reply({
        content:
          "❌ I cannot assign this role as it's higher than or equal to my highest role.",
        ephemeral: true,
      });
    }

    // Check if the role is @everyone
    if (role.id === guildId) {
      return interaction.reply({
        content: "❌ Cannot set @everyone as the auto role.",
        ephemeral: true,
      });
    }

    // Update or create the auto role configuration
    await AutoRole.findOneAndUpdate(
      { guildId },
      { guildId, roleId: role.id },
      { upsert: true, new: true }
    );

    await interaction.reply({
      content: `✅ Auto role has been configured! New members will automatically receive the ${role} role.`,
      ephemeral: true,
    });
  } catch (error) {
    console.error("Error in autorole-configure command:", error);
    await interaction.reply({
      content:
        "❌ An error occurred while configuring the auto role. Please try again.",
      ephemeral: true,
    });
  }
}

export const options = {
  botPermissions: [PermissionFlagsBits.ManageRoles],
};
