import { Schema, model } from "mongoose";

const automationTaskSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    guildId: { type: String, required: true },
    channelId: { type: String, required: true },
    taskType: {
      type: String,
      enum: [
        "game_deals",
        "youtube_videos",
        "anime_updates",
        "rss_feed",
        "custom_api",
        "one_time_reminder",
        "recurring_reminder",
        "birthday_reminder",
        "event_reminder",
        "backup_reminder",
        "maintenance_reminder",
      ],
      required: true,
    },
    taskConfig: { type: Object, required: true },
    schedule: {
      type: {
        type: String,
        enum: ["interval", "cron", "one_time"],
        required: true,
      },
      interval: Number,
      cronExpression: String,
      executeAt: Date,
      timezone: { type: String, default: "UTC" },
      enabled: { type: Boolean, default: true },
      runOnStartup: { type: Boolean, default: false },
      skipDuplicates: { type: Boolean, default: true },
      maxExecutions: Number,
      executionCount: { type: Number, default: 0 },
    },
    notificationConfig: {
      embedTemplate: {
        title: { type: String, default: "🔔 Automation Update" },
        description: String,
        color: { type: String, default: "#00FF00" },
        footer: String,
        thumbnail: { type: Boolean, default: true },
        fields: [
          {
            name: String,
            value: String,
            inline: { type: Boolean, default: false },
          },
        ],
      },
      mentionRoles: [String],
      mentionUsers: [String],
      messageTemplate: String,
      maxItemsPerNotification: { type: Number, default: 10 },
      groupNotifications: { type: Boolean, default: true },
    },
    isActive: { type: Boolean, default: true },
    createdBy: { type: String, required: true },
    lastRun: Date,
    nextRun: Date,
    errorCount: { type: Number, default: 0 },
    lastError: String,
    category: {
      type: String,
      enum: ["monitoring", "reminders", "maintenance", "events", "custom"],
      required: true,
    },
    tags: [String],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for performance
automationTaskSchema.index({ guildId: 1, isActive: 1 });
automationTaskSchema.index({ taskType: 1 });
automationTaskSchema.index({ "schedule.enabled": 1, isActive: 1 });
automationTaskSchema.index({ nextRun: 1 });

export default model("AutomationTask", automationTaskSchema);
