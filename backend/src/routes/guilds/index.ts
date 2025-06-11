import { Router } from "express";
import { getGuildsController } from "../../controllers/guilds";

const router = Router();

router.get("/", getGuildsController);

export default router;
