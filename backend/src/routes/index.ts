import { Router } from "express";
import authRouter from "./auth";
import guildsRouter from "./guilds";
import userRouter from "./user";
import welcomeRouter from "./welcome";
import leaveRouter from "./leave";
import autoroleRouter from "./autorole";
import automationRouter from "./automation";
import { isAuthenticated } from "../utils/middlewares";

const router = Router();

router.use("/auth", authRouter);
router.use("/guilds", isAuthenticated, guildsRouter);
router.use("/users", isAuthenticated, userRouter);
router.use("/welcome", welcomeRouter);
router.use("/leave", leaveRouter);
router.use("/autorole", autoroleRouter);
router.use("/automation", automationRouter);

export default router;
