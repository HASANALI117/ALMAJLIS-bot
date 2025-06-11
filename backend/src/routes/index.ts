import { Router } from "express";
import authRouter from "./auth";
import dashboardRouter from "./dashboard";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.use("/auth", authRouter);
router.use("/dashboard", authenticateToken, dashboardRouter);

export default router;
