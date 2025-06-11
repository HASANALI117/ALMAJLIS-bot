import { Router } from "express";
import authRoute from "./auth";
import dashboardRoute from "./dashboard";
import messageRoute from "./message";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.use("/auth", authRoute);
router.use("/message", authenticateToken, dashboardRoute);
router.use("/dashboard", authenticateToken, messageRoute);

export default router;
