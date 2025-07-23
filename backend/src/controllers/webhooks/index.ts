import { Request, Response } from "express";
import {
  processWaitlistNotification,
  processPingEvent,
} from "../../services/webhooks";

export const handleDealAlertController = async (
  req: Request,
  res: Response
) => {
  try {
    const hookId = req.headers["itad-hook-id"] as string;
    const eventType = req.headers["itad-hook-event"] as string;
    const userAgent = req.headers["user-agent"];
    const contentType = req.headers["content-type"];

    // Validate headers
    if (!hookId || !eventType) {
      return res.status(400).json({ error: "Missing required ITAD headers" });
    }

    if (userAgent !== "ITAD-Webhooks/1.0 (+https://isthereanydeal.com)") {
      return res.status(400).json({ error: "Invalid User-Agent" });
    }

    if (contentType !== "application/json") {
      return res.status(400).json({ error: "Invalid Content-Type" });
    }

    // console.log(
    //   `Received ITAD webhook - Event: ${eventType}, Hook ID: ${hookId}`
    // );

    switch (eventType) {
      case "ping":
        await processPingEvent(hookId, req.body);
        break;

      case "notification-waitlist":
        await processWaitlistNotification(hookId, req.body);
        break;

      default:
        console.warn(`Unknown event type: ${eventType}`);
        return res.status(400).json({ error: "Unknown event type" });
    }

    res.status(200).json({ message: "Webhook processed successfully" });
  } catch (error) {
    console.error("Error processing ITAD webhook:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
