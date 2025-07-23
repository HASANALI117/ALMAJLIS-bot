import { Router } from "express";
import { handleDealAlertController } from "../../controllers/webhooks";
import { handleITADPayload } from "../../utils/middlewares";

const router = Router();

router.post("/deal-alert", handleITADPayload, handleDealAlertController);

export default router;
