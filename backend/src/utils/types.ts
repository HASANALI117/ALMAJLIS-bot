export type PartialGuild = {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: string;
  features: string[];
  roles?: Role[];
};

export type DiscordUser = {
  id: string;
  email?: string;
  username: string;
  global_name?: string;
  avatar: string | null;
  banner?: string;
  discriminator?: string;
};

export type Channel = {
  id: string;
  type: number;
  name: string;
  guild_id: string;
  last_message_id?: string;
  parent_id?: string;
  rate_limit_per_user?: number;
  topic?: string;
  position?: number;
  permission_overwrites?: Array<{
    id: string;
    type: number;
    allow: string;
    deny: string;
  }>;
  nsfw?: boolean;
};

export type Role = {
  id: string;
  name: string;
  color: number;
  hoist: boolean;
  position: number;
  permissions: string;
  managed: boolean;
  mentionable: boolean;
};

// ===== AUTOMATION SYSTEM TYPES =====

export interface AutomationTask {
  id: string;
  name: string;
  description: string;
  guildId: string;
  channelId: string;
  taskType: TaskType;
  taskConfig: TaskConfig;
  schedule: ScheduleConfig;
  notificationConfig: NotificationConfig;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  lastRun?: Date;
  nextRun?: Date;
  errorCount: number;
  lastError?: string;
  category: TaskCategory;
  tags?: string[];
}

export enum TaskType {
  GAME_DEALS = "game_deals",
  YOUTUBE_VIDEOS = "youtube_videos",
  ANIME_UPDATES = "anime_updates",
  RSS_FEED = "rss_feed",
  CUSTOM_API = "custom_api",
  ONE_TIME_REMINDER = "one_time_reminder",
  RECURRING_REMINDER = "recurring_reminder",
  BIRTHDAY_REMINDER = "birthday_reminder",
  EVENT_REMINDER = "event_reminder",
  BACKUP_REMINDER = "backup_reminder",
  MAINTENANCE_REMINDER = "maintenance_reminder",
}

export enum TaskCategory {
  MONITORING = "monitoring",
  REMINDERS = "reminders",
  MAINTENANCE = "maintenance",
  EVENTS = "events",
  CUSTOM = "custom",
}

export interface TaskConfig {
  type: TaskType;
  apiKey?: string;
  endpoint?: string;
  queryParams?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
  reminderText?: string;
  reminderDate?: Date;
  targetUsers?: string[];
  customConfig?: Record<string, any>;
}

export interface ScheduleConfig {
  type: "interval" | "cron" | "one_time";
  interval?: number;
  cronExpression?: string;
  executeAt?: Date;
  timezone?: string;
  enabled: boolean;
  runOnStartup?: boolean;
  skipDuplicates?: boolean;
  maxExecutions?: number;
  executionCount?: number;
}

export interface NotificationConfig {
  embedTemplate: EmbedTemplate;
  mentionRoles?: string[];
  mentionUsers?: string[];
  messageTemplate?: string;
  maxItemsPerNotification?: number;
  groupNotifications?: boolean;
}

export interface EmbedTemplate {
  title: string;
  description?: string;
  color?: string;
  footer?: string;
  thumbnail?: boolean;
  fields?: Array<{
    name: string;
    value: string;
    inline?: boolean;
  }>;
}

export interface TaskResult {
  taskId: string;
  executedAt: Date;
  status: TaskStatus;
  itemsFound?: number;
  newItems?: number;
  data: any[];
  error?: string;
  duration: number;
  responseTime?: number;
}

export enum TaskStatus {
  SUCCESS = "success",
  ERROR = "error",
  NO_CHANGES = "no_changes",
  TIMEOUT = "timeout",
  RATE_LIMITED = "rate_limited",
  SKIPPED = "skipped",
  COMPLETED = "completed",
}

export interface TaskEvent {
  taskId: string;
  type: TaskEventType;
  data: any;
  timestamp: Date;
}

export enum TaskEventType {
  TASK_STARTED = "task_started",
  TASK_COMPLETED = "task_completed",
  TASK_FAILED = "task_failed",
  NEW_ITEMS_FOUND = "new_items_found",
  REMINDER_TRIGGERED = "reminder_triggered",
  NOTIFICATION_SENT = "notification_sent",
}

export interface TaskHandler {
  type: TaskType;
  category: TaskCategory;
  execute(config: TaskConfig): Promise<any[]>;
  compare?(oldData: any[], newData: any[]): any[];
  formatForNotification(data: any[]): NotificationData[];
  validateConfig(config: TaskConfig): boolean;
}

export interface NotificationData {
  title: string;
  description?: string;
  url?: string;
  image?: string;
  timestamp?: Date;
  metadata?: Record<string, any>;
}

// ITAD specific types
export interface ITADDeal {
  id: string;
  title: string;
  shop: { id: string; name: string };
  price: { amount: number; currency: string };
  regular: { amount: number; currency: string };
  cut: number;
  url: string;
  assets?: { banner600?: string; capsule?: string };
  added: number;
  expiry?: number;
  drm?: string[];
}

export interface ITADResponse {
  deals: ITADDeal[];
  count: number;
  pages: number;
}
