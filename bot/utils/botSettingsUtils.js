import BotSettings from "../models/BotSettings.js";
import { ActivityType } from "discord.js";

export const updateBotStatus = async (client, guildId) => {
  try {
    const settings = await BotSettings.findOne({ guildId });

    if (!settings) {
      // Set default status if no settings found
      client.user.setPresence({
        activities: [
          {
            name: "Managing servers",
            type: ActivityType.Playing,
          },
        ],
        status: "online",
      });
      console.log("Bot status set to default: Playing Managing servers");
      return;
    }

    const activityTypes = {
      playing: ActivityType.Playing,
      listening: ActivityType.Listening,
      watching: ActivityType.Watching,
      competing: ActivityType.Competing,
    };

    client.user.setPresence({
      activities: [
        {
          name: settings.status.text,
          type: activityTypes[settings.status.type],
        },
      ],
      status: "online",
    });

    console.log(
      `Bot status updated: ${settings.status.type} ${settings.status.text}`
    );
  } catch (error) {
    console.error("Error updating bot status:", error);
  }
};

export const updateGuildNickname = async (client, guildId) => {
  try {
    const settings = await BotSettings.findOne({ guildId });
    if (!settings || !settings.nickname) return;

    const guild = client.guilds.cache.get(guildId);
    if (!guild) return;

    const botMember = guild.members.me;
    if (!botMember) return;

    if (botMember.nickname !== settings.nickname) {
      await botMember.setNickname(settings.nickname);
      console.log(
        `Updated nickname to "${settings.nickname}" in ${guild.name}`
      );
    }
  } catch (error) {
    console.error(`Error updating nickname for guild ${guildId}:`, error);
  }
};

export const updateAllNicknames = async (client) => {
  try {
    const allSettings = await BotSettings.find({});

    for (const settings of allSettings) {
      await updateGuildNickname(client, settings.guildId);
    }
  } catch (error) {
    console.error("Error updating all nicknames:", error);
  }
};

export const getGuildPrefixes = async (guildId) => {
  try {
    const settings = await BotSettings.findOne({ guildId });
    return settings?.prefixes || ["!", "?", "."];
  } catch (error) {
    console.error("Error getting guild prefixes:", error);
    return ["!", "?", "."];
  }
};
