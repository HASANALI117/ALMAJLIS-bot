import { Router } from "express";
import authRouter from "./auth";
import dashboardRouter from "./dashboard";
import messageRouter from "./message";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.use("/auth", authRouter);
router.use("/message", authenticateToken, dashboardRouter);
router.use("/dashboard", authenticateToken, messageRouter);

export default router;
