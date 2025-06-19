import { Router } from "express";
import {
  getAutoroleSettingsController,
  setAutoroleSettingsController,
  deleteAutoroleSettingsController,
} from "../../controllers/autorole";

const router = Router();

router.get("/:guildId", getAutoroleSettingsController);
router.post("/:guildId", setAutoroleSettingsController);
router.delete("/:guildId", deleteAutoroleSettingsController);

export default router;
