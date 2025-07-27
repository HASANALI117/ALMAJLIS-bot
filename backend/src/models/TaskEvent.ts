import { Schema, model } from "mongoose";

const taskEventSchema = new Schema(
  {
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "AutomationTask",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: [
        "task_started",
        "task_completed",
        "task_failed",
        "new_items_found",
        "reminder_triggered",
        "notification_sent",
        "task_skipped",
        "task_cancelled",
      ],
      required: true,
      index: true,
    },
    data: {
      type: Schema.Types.Mixed,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
    guildId: {
      type: String,
      index: true,
    },
    channelId: {
      type: String,
      index: true,
    },
    userId: String,
    metadata: {
      itemCount: Number,
      duration: Number,
      status: String,
      error: String,
    },
  },
  {
    timestamps: true,
    // TTL index - auto-delete events after 30 days
    expires: 30 * 24 * 60 * 60,
  }
);

// Compound indexes for efficient queries
taskEventSchema.index({ taskId: 1, timestamp: -1 });
taskEventSchema.index({ guildId: 1, type: 1, timestamp: -1 });
taskEventSchema.index({ type: 1, timestamp: -1 });

export default model("TaskEvent", taskEventSchema);
