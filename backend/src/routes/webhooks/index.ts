import { Router } from "express";
import { handleDealAlertController } from "../../controllers/webhooks";
import {
  handleITADPayload,
  handleWebhookError,
  logWebhookRequest,
} from "../../utils/middlewares";

const router = Router();

// Apply logging middleware to all webhook routes
router.use(logWebhookRequest);

router.post("/deal-alert", handleITADPayload, handleDealAlertController);

// Error handling middleware
router.use(handleWebhookError);

export default router;
