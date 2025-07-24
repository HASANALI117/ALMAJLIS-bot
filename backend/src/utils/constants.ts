// Discord API Endpoint
export const DISCORD_API_ENDPOINT = "https://discord.com/api/v10";

/**
 * Redis connection configuration
 */
export const REDIS_CONFIG = {
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
  lazyConnect: true,
  enableReadyCheck: true,
};
/**
 * Redis channel names
 */
export const REDIS_CHANNELS = {
  GAME_DEALS: "game-deals",
  WEBHOOK_EVENTS: "webhook-events",
};

/**
 * Redis message types
 */
export const MESSAGE_TYPES = {
  DEAL_NOTIFICATION: "deal-notification",
  PING_EVENT: "ping-event",
};
