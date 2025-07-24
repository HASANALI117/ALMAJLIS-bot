import { NextFunction, Request, Response } from "express";
import express from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.user ? next() : res.status(401).json({ message: "Unauthorized" });
};

// Middleware to handle ITAD payloads
export const handleITADPayload = (req: any, res: any, next: any) => {
  // Check both possible header formats (case-insensitive)
  const eventType = req.headers["itad-hook-event"];

  if (eventType === "ping") {
    // For ping events, use text parser to handle raw string
    express.text({ type: "application/json" })(req, res, () => {
      try {
        // Remove surrounding quotes if present
        if (
          typeof req.body === "string" &&
          req.body.startsWith('"') &&
          req.body.endsWith('"')
        ) {
          req.body = req.body.slice(1, -1);
        }

        next();
      } catch (error) {
        console.error("❌ Error processing text payload:", error);
        res.status(400).json({ error: "Invalid text payload" });
      }
    });
  } else {
    // For other events, use JSON parser
    express.json()(req, res, (err: any) => {
      if (err) {
        console.error("❌ Error parsing JSON payload:", err);
        return res.status(400).json({ error: "Invalid JSON payload" });
      }
    });

    next();
  }
};

/**
 * Request logging middleware for webhooks
 */
export const logWebhookRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const timestamp = new Date().toISOString();
  const hookId = req.headers["itad-hook-id"];
  const eventType = req.headers["itad-hook-event"];

  console.log(`📨 [${timestamp}] Webhook received:`);
  console.log(`   Hook ID: ${hookId}`);
  console.log(`   Event: ${eventType}`);
  console.log(`   IP: ${req.ip}`);
  console.log(`   User-Agent: ${req.headers["user-agent"]}`);

  next();
};

/**
 * Error handling middleware for webhooks
 */
export const handleWebhookError = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("❌ Webhook error:", error);

  const errorResponse = {
    error: "Webhook processing failed",
    message: error.message || "Unknown error",
    timestamp: new Date().toISOString(),
    hookId: req.headers["itad-hook-id"] || "unknown",
    eventType: req.headers["itad-hook-event"] || "unknown",
  };

  res.status(500).json(errorResponse);
};
