import { Router } from "express";
import {
  getGuildController,
  getGuildPermissionsController,
  getGuildsController,
  getGuildChannelsController,
} from "../../controllers/guilds";

const router = Router();

router.get("/", getGuildsController);
router.get("/:id/permissions", getGuildPermissionsController);
router.get("/:id", getGuildController);
router.get("/:id/channels", getGuildChannelsController);

export default router;
