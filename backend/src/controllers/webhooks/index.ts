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
      return res.status(400).json({
        error: "Missing required ITAD headers",
        details: { hookId: !!hookId, eventType: !!eventType },
      });
    }

    if (userAgent !== "ITAD-Webhooks/1.0 (+https://isthereanydeal.com)") {
      return res.status(400).json({
        error: "Invalid User-Agent",
        expected: "ITAD-Webhooks/1.0 (+https://isthereanydeal.com)",
        received: userAgent,
      });
    }

    if (contentType !== "application/json") {
      return res.status(400).json({
        error: "Invalid Content-Type",
        expected: "application/json",
        received: contentType,
      });
    }

    switch (eventType) {
      case "ping":
        await processPingEvent(hookId, req.body);
        break;

      case "notification-waitlist":
        await processWaitlistNotification(hookId, req.body);
        break;

      default:
        console.warn(`⚠️ Unknown event type: ${eventType}`);
        return res.status(400).json({
          error: "Unknown event type",
          supportedTypes: ["ping", "notification-waitlist"],
          received: eventType,
        });
    }

    res.status(200).json({
      message: "Webhook processed successfully",
      hookId,
      eventType,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Error processing ITAD webhook:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
