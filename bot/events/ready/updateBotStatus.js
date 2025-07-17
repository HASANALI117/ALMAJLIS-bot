import {
  updateBotStatus,
  updateAllNicknames,
} from "../../utils/botSettingsUtils.js";

export default async (client) => {
  console.log(`Bot is Online. Logged in as ${client.user.tag}`);

  // Initial status update
  await updateBotStatus(client);

  // Update all nicknames after a short delay
  setTimeout(() => {
    updateAllNicknames(client);
  }, 5000);

  // Update status every 10 minutes
  setInterval(() => {
    updateBotStatus(client);
  }, 10 * 60 * 1000);
};
