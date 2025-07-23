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

  // console.log("=== WEBHOOK DEBUG ===");
  // console.log("All headers:", JSON.stringify(req.headers, null, 2));
  // console.log(`Event Type found: ${eventType}`);

  if (eventType === "ping") {
    // console.log("Handling ITAD ping event with text parser");
    // For ping events, use text parser to handle raw string
    express.text({ type: "application/json" })(req, res, () => {
      // console.log(`Raw ping body: ${req.body}`);
      // Remove surrounding quotes if present
      if (
        typeof req.body === "string" &&
        req.body.startsWith('"') &&
        req.body.endsWith('"')
      ) {
        req.body = req.body.slice(1, -1);
      }
      // console.log(`Processed ping body: ${req.body}`);
      next();
    });
  } else if (eventType === "notification-waitlist") {
    console.log("Handling ITAD notification event with JSON parser");
    // For other events, use JSON parser
    express.json()(req, res, next);
  } else {
    console.log(
      "Unknown or missing event type, defaulting to text parser for safety"
    );
    // Default to text parser if event type is unknown/missing
    express.text({ type: "application/json" })(req, res, () => {
      console.log(`Raw body (unknown event): ${req.body}`);
      // Remove surrounding quotes if present
      if (
        typeof req.body === "string" &&
        req.body.startsWith('"') &&
        req.body.endsWith('"')
      ) {
        req.body = req.body.slice(1, -1);
      }
      console.log(`Processed body (unknown event): ${req.body}`);
      next();
    });
  }
};
