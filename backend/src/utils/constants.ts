// Discord API Endpoint
export const DISCORD_API_ENDPOINT = "https://discord.com/api/v10";

// Redis connection configuration
export const REDIS_CONFIG = {
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
  lazyConnect: true,
  enableReadyCheck: true,
};
// Redis channel names
export const REDIS_CHANNELS = {
  GAME_DEALS: "game-deals",
  WEBHOOK_EVENTS: "webhook-events",
};

// Redis message types
export const MESSAGE_TYPES = {
  DEAL_NOTIFICATION: "deal-notification",
  PING_EVENT: "ping-event",
};

// Automation task configurations
export const AUTOMATION_DEFAULTS = {
  notificationConfig: {
    embedTemplate: {
      title: "🔔 Automation Update",
      color: "#00FF00",
      footer: "ALMAJLIS Bot",
      thumbnail: false,
      fields: [],
    },
    mentionRoles: [],
    mentionUsers: [],
    messageTemplate: "",
    maxItemsPerNotification: 10,
    groupNotifications: true,
  },
  schedule: {
    type: "interval",
    interval: 30 * 60 * 1000, // 30 minutes
    timezone: "UTC",
    enabled: true,
    runOnStartup: false,
    skipDuplicates: true,
  },
};

export const AUTOMATION_LIMITS = {
  maxTasksPerGuild: 20,
  maxExecutionsPerTask: 1000,
  minIntervalMs: 5000,
  maxIntervalMs: 7 * 24 * 60 * 60 * 1000, // 1 week
};

export const CRON_PRESETS = {
  EVERY_5_MINUTES: "0 */5 * * * *",
  EVERY_15_MINUTES: "0 */15 * * * *",
  EVERY_30_MINUTES: "0 */30 * * * *",
  EVERY_HOUR: "0 0 * * * *",
  DAILY_9AM: "0 0 9 * * *",
};
