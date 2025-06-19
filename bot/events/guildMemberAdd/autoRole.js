import AutoRole from "../../models/AutoRole.js";

export default async (member) => {
  try {
    const guildId = member.guild.id;

    // Find the auto role configuration for this guild
    const autoRoleConfig = await AutoRole.findOne({ guildId });

    // If no auto role is configured, return early
    if (!autoRoleConfig) {
      return;
    }

    // Get the role from the guild
    const role = member.guild.roles.cache.get(autoRoleConfig.roleId);

    // If the role doesn't exist anymore, clean up the database
    if (!role) {
      await AutoRole.findOneAndDelete({ guildId });
      console.log(
        `Auto role removed from database for guild ${guildId} - role no longer exists`
      );
      return;
    }

    // Check if the bot can assign this role
    const botMember = member.guild.members.me;
    if (role.position >= botMember.roles.highest.position) {
      console.log(
        `Cannot assign auto role in ${member.guild.name} - role position too high`
      );
      return;
    }

    // Check if the member already has the role (shouldn't happen, but just in case)
    if (member.roles.cache.has(role.id)) {
      return;
    }

    // Assign the role to the new member
    await member.roles.add(role, "Auto role assignment");

    console.log(
      `Auto role "${role.name}" assigned to ${member.user.tag} in ${member.guild.name}`
    );
  } catch (error) {
    console.error("Error in autoRole event:", error);
    // Don't throw the error to prevent disrupting other guildMemberAdd events
  }
};
