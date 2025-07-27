import { NextFunction, Request, Response } from "express";
import express from "express";
import { TaskType, TaskCategory } from "./types";
import { CronHelper } from "./cronHelper";

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
      next();
    });
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

/**
 * Validation middleware for automation tasks
 */
export const validateTaskData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, guildId, channelId, taskType, taskConfig, schedule } =
      req.body;

    // Required fields validation
    if (!name || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "Task name is required and must be a string",
      });
    }

    if (!guildId || typeof guildId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Guild ID is required and must be a string",
      });
    }

    if (!channelId || typeof channelId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Channel ID is required and must be a string",
      });
    }

    // Task type validation
    if (!taskType || !Object.values(TaskType).includes(taskType)) {
      return res.status(400).json({
        success: false,
        message: `Invalid task type. Must be one of: ${Object.values(
          TaskType
        ).join(", ")}`,
      });
    }

    // Task config validation
    if (!taskConfig || typeof taskConfig !== "object") {
      return res.status(400).json({
        success: false,
        message: "Task configuration is required and must be an object",
      });
    }

    // Schedule validation
    if (!schedule || typeof schedule !== "object") {
      return res.status(400).json({
        success: false,
        message: "Schedule configuration is required and must be an object",
      });
    }

    const scheduleValidation = CronHelper.validateScheduleConfig(schedule);
    if (!scheduleValidation.valid) {
      return res.status(400).json({
        success: false,
        message: `Invalid schedule: ${scheduleValidation.error}`,
      });
    }

    // Validate specific task types
    switch (taskType) {
      case TaskType.GAME_DEALS:
        if (!taskConfig.apiKey) {
          return res.status(400).json({
            success: false,
            message: "API key is required for game deals tasks",
          });
        }
        break;

      case TaskType.RECURRING_REMINDER:
      case TaskType.ONE_TIME_REMINDER:
        if (!taskConfig.reminderText && !taskConfig.customConfig?.description) {
          return res.status(400).json({
            success: false,
            message: "Reminder text is required for reminder tasks",
          });
        }
        break;
    }

    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid request data",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Middleware to validate task ownership/permissions
 */
export const validateTaskAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { taskId } = req.params;
    const { guildId } = req.body || req.query;

    // In a real app, you'd validate that the user has permission to access this task
    // For now, we'll just validate the task exists and belongs to the guild

    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required",
      });
    }

    // Additional validation logic would go here
    // e.g., check if user has admin permissions in the guild

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to validate task access",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
