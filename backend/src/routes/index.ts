import { Router } from "express";
import authRouter from "./auth";
import guildsRouter from "./guilds";
import userRouter from "./user";
import welcomeRouter from "./welcome";
import autoroleRouter from "./autorole";
import botSettingsRouter from "./bot-settings";
import { isAuthenticated } from "../utils/middlewares";

const router = Router();

router.use("/auth", authRouter);
router.use("/guilds", isAuthenticated, guildsRouter);
router.use("/users", isAuthenticated, userRouter);
router.use("/welcome", welcomeRouter);
router.use("/autorole", autoroleRouter);
router.use("/bot-settings", botSettingsRouter);

export default router;
