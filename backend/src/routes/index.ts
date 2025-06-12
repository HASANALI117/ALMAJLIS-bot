import { Router } from "express";
import authRouter from "./auth";
import dashboardRouter from "./dashboard";
import guildsRouter from "./guilds";
import userRouter from "./user";
import { isAuthenticated } from "../utils/middlewares";

const router = Router();

router.use("/auth", authRouter);
router.use("/dashboard", isAuthenticated, dashboardRouter);
router.use("/guilds", isAuthenticated, guildsRouter);
router.use("/users", isAuthenticated, userRouter);

export default router;
