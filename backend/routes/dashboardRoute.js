import express from "express";
import {
  getDashboardData,
  getGuilds,
  inviteBot,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/user", getDashboardData);
router.get("/guilds", getGuilds);
router.get("/invite-bot/:guildID", inviteBot);

export default router;
