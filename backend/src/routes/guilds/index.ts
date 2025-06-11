import { Router } from "express";
import {
  getGuildController,
  getGuildPermissionsController,
  getGuildsController,
} from "../../controllers/guilds";

const router = Router();

router.get("/", getGuildsController);
router.get("/:id/permissions", getGuildPermissionsController);
router.get("/:id", getGuildController);

export default router;
