import { Router } from "express";
import passport from "passport";
import {
  handleDiscordCallback,
  handleDiscordRedirect,
} from "../../controllers/auth/index.js";

const router = Router();

router.get("/discord", passport.authenticate("discord"), handleDiscordRedirect);

router.get(
  "/discord/callback",
  passport.authenticate("discord"),
  handleDiscordCallback
);

export default router;
