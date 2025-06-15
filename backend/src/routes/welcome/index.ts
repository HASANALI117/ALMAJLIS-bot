import { Router } from "express";
import {
  deleteWelcomeSettingsController,
  getWelcomeSettingsController,
  setWelcomeSettingsController,
} from "../../controllers/welcome";

const router = Router();

router.get("/:guildId", getWelcomeSettingsController);
router.post("/:guildId", setWelcomeSettingsController);
router.delete("/:guildId", deleteWelcomeSettingsController);

export default router;
