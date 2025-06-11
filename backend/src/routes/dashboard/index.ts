import express from "express";
import {
  getDashboardData,
  getGuilds,
  inviteBot,
  getGuildChannels,
} from "../../controllers/dashboardController.js";
import {
  getWelcomeSettings,
  setWelcomeChannel,
} from "../../controllers/welcomeController.js";

const router = express.Router();

router.get("/user", getDashboardData);
router.get("/guilds", getGuilds);
router.get("/invite-bot/:guildID", inviteBot);
router.get("/guilds/:guildId/channels", getGuildChannels);

router.get("/welcome-settings/:guildId", getWelcomeSettings);
router.post("/set-welcome-channel", setWelcomeChannel);

export default router;
