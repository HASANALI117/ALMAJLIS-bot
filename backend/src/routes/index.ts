import { Router } from "express";
import authRouter from "./auth";
import dashboardRouter from "./dashboard";
import guildsRouter from "./guilds";
import { isAuthenticated } from "../utils/middlewares";

const router = Router();

router.use("/auth", authRouter);
router.use("/dashboard", isAuthenticated, dashboardRouter);
router.use("/guilds", isAuthenticated, guildsRouter);

export default router;
