import { Router } from "express";
import {
  deleteLeaveSettingsController,
  getLeaveSettingsController,
  setLeaveSettingsController,
} from "../../controllers/leave";

const router = Router();

router.get("/:guildId", getLeaveSettingsController);
router.post("/:guildId", setLeaveSettingsController);
router.delete("/:guildId", deleteLeaveSettingsController);

export default router;
