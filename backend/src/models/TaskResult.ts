import { Schema, model } from "mongoose";

const taskResultSchema = new Schema(
  {
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "AutomationTask",
      required: true,
    },
    executedAt: { type: Date, required: true },
    status: {
      type: String,
      enum: [
        "success",
        "error",
        "no_changes",
        "timeout",
        "rate_limited",
        "skipped",
        "completed",
      ],
      required: true,
    },
    itemsFound: { type: Number, default: 0 },
    newItems: { type: Number, default: 0 },
    data: [Schema.Types.Mixed],
    error: String,
    duration: { type: Number, required: true },
    responseTime: Number,
  },
  {
    timestamps: true,
  }
);

// TTL index - auto-delete results after 30 days
taskResultSchema.index(
  { executedAt: 1 },
  { expireAfterSeconds: 30 * 24 * 60 * 60 }
);
taskResultSchema.index({ taskId: 1, status: 1, executedAt: -1 });

export default model("TaskResult", taskResultSchema);
