import { Router } from "express";
import { getCurrentUserController } from "../../controllers/user";

const router = Router();

router.get("/me", getCurrentUserController);

export default router;
