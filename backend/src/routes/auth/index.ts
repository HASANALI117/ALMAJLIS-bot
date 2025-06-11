import { Router } from "express";
import { authenticate, callback } from "../../controllers/authController.js";

const router = Router();

router.get("/signin", authenticate);

router.get("/discord/callback", callback);

export default router;
