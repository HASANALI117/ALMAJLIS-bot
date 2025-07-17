import { Router } from "express";
import {
  getBotSettingsController,
  setBotSettingsController,
  deleteBotSettingsController,
} from "../../controllers/botSettings";

const router = Router();

router.get("/:guildId", getBotSettingsController);
router.post("/:guildId", setBotSettingsController);
router.delete("/:guildId", deleteBotSettingsController);

export default router;
