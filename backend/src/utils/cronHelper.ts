import cron from "node-cron";

export class CronHelper {
  /**
   * Validates a cron expression
   */
  static validate(cronExpression: string): boolean {
    try {
      return cron.validate(cronExpression);
    } catch (error) {
      return false;
    }
  }

  /**
   * Converts interval milliseconds to cron expression
   */
  static intervalToCron(intervalMs: number): string {
    const seconds = Math.floor(intervalMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      const sec = Math.max(5, seconds); // Minimum 5 seconds
      return `*/${sec} * * * * *`;
    } else if (minutes < 60) {
      const min = Math.max(1, minutes); // Ensure at least 1 minute
      return `0 */${min} * * * *`;
    } else if (hours < 24) {
      const hr = Math.max(1, hours); // Ensure at least 1 hour
      return `0 0 */${hr} * * *`;
    } else {
      const day = Math.max(1, days); // Ensure at least 1 day
      return `0 0 0 */${day} * *`;
    }
  }

  /**
   * Converts cron expression to human-readable description
   */
  static describe(cronExpression: string): string {
    const descriptions: Record<string, string> = {
      "0 */5 * * * *": "Every 5 minutes",
      "0 */15 * * * *": "Every 15 minutes",
      "0 */30 * * * *": "Every 30 minutes",
      "0 0 * * * *": "Every hour",
      "0 0 */2 * * *": "Every 2 hours",
      "0 0 */6 * * *": "Every 6 hours",
      "0 0 0 * * *": "Daily at midnight",
      "0 0 9 * * *": "Daily at 9:00 AM",
      "0 0 9 * * 1-5": "Weekdays at 9:00 AM",
      "0 0 10 * * 0,6": "Weekends at 10:00 AM",
      "0 0 9 * * 1": "Every Monday at 9:00 AM",
      "0 0 9 1 * *": "First day of every month at 9:00 AM",
    };

    return descriptions[cronExpression] || `Custom schedule: ${cronExpression}`;
  }

  /**
   * Gets next execution time for a cron expression
   */
  static getNextExecution(
    cronExpression: string,
    timezone: string = "UTC"
  ): Date {
    try {
      // Validate first
      if (!this.validate(cronExpression)) {
        throw new Error(`Invalid cron expression: ${cronExpression}`);
      }

      // For now, return a calculated next execution
      // TODO: Implement proper cron parsing with 'cron-parser' library
      const now = new Date();

      // Simple fallback calculation based on common patterns
      if (cronExpression.includes("*/5 *")) {
        return new Date(now.getTime() + 5 * 60 * 1000); // +5 minutes
      } else if (cronExpression.includes("*/15 *")) {
        return new Date(now.getTime() + 15 * 60 * 1000); // +15 minutes
      } else if (cronExpression.includes("*/30 *")) {
        return new Date(now.getTime() + 30 * 60 * 1000); // +30 minutes
      } else if (cronExpression.includes("0 * *")) {
        return new Date(now.getTime() + 60 * 60 * 1000); // +1 hour
      }

      return new Date(now.getTime() + 60000); // Fallback: 1 minute from now
    } catch (error) {
      throw new Error(`Invalid cron expression: ${cronExpression}`);
    }
  }

  /**
   * Common cron presets
   */
  static readonly PRESETS = {
    EVERY_5_MINUTES: "0 */5 * * * *",
    EVERY_15_MINUTES: "0 */15 * * * *",
    EVERY_30_MINUTES: "0 */30 * * * *",
    EVERY_HOUR: "0 0 * * * *",
    EVERY_2_HOURS: "0 0 */2 * * *",
    EVERY_6_HOURS: "0 0 */6 * * *",
    DAILY_9AM: "0 0 9 * * *",
    DAILY_MIDNIGHT: "0 0 0 * * *",
    WEEKDAYS_9AM: "0 0 9 * * 1-5",
    WEEKENDS_10AM: "0 0 10 * * 0,6",
    WEEKLY_MONDAY_9AM: "0 0 9 * * 1",
    MONTHLY_FIRST_DAY: "0 0 9 1 * *",
  } as const;

  /**
   * Validates schedule configuration
   */
  static validateScheduleConfig(config: {
    type: "interval" | "cron" | "one_time";
    interval?: number;
    cronExpression?: string;
    executeAt?: Date;
  }): { valid: boolean; error?: string } {
    const { type, interval, cronExpression, executeAt } = config;

    switch (type) {
      case "interval":
        if (!interval || interval < 5000) {
          return {
            valid: false,
            error: "Interval must be at least 5 seconds (5000ms)",
          };
        }
        if (interval > 7 * 24 * 60 * 60 * 1000) {
          // 1 week max
          return {
            valid: false,
            error: "Interval cannot exceed 1 week (604800000ms)",
          };
        }
        return { valid: true };

      case "cron":
        if (!cronExpression) {
          return { valid: false, error: "Cron expression is required" };
        }
        if (!this.validate(cronExpression)) {
          return { valid: false, error: "Invalid cron expression" };
        }
        return { valid: true };

      case "one_time":
        if (!executeAt) {
          return {
            valid: false,
            error: "Execution date is required for one-time tasks",
          };
        }
        if (executeAt.getTime() <= Date.now()) {
          return {
            valid: false,
            error: "Execution date must be in the future",
          };
        }
        // Don't allow one-time tasks more than 1 year in the future
        if (executeAt.getTime() > Date.now() + 365 * 24 * 60 * 60 * 1000) {
          return {
            valid: false,
            error: "Execution date cannot be more than 1 year in the future",
          };
        }
        return { valid: true };

      default:
        return { valid: false, error: "Invalid schedule type" };
    }
  }

  /**
   * Get human-readable time until next execution
   */
  static getTimeUntilNext(cronExpression: string, timezone?: string): string {
    try {
      const nextExecution = this.getNextExecution(cronExpression, timezone);
      const now = new Date();
      const diff = nextExecution.getTime() - now.getTime();

      if (diff < 0) return "Past due";

      const minutes = Math.floor(diff / (1000 * 60));
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) return `${days} day${days > 1 ? "s" : ""}`;
      if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""}`;
      if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""}`;

      return "Less than 1 minute";
    } catch (error) {
      return "Unknown";
    }
  }

  /**
   * Check if cron expression represents a reasonable frequency
   */
  static isReasonableFrequency(cronExpression: string): {
    reasonable: boolean;
    warning?: string;
  } {
    if (!this.validate(cronExpression)) {
      return { reasonable: false, warning: "Invalid cron expression" };
    }

    // Check for overly frequent executions
    if (cronExpression.includes("*/1 *") || cronExpression.includes("* *")) {
      return {
        reasonable: false,
        warning:
          "Execution every minute or more frequent may cause performance issues",
      };
    }

    // Check for very frequent executions (every few seconds)
    if (cronExpression.match(/\*\/[1-4] \* \* \* \* \*/)) {
      return {
        reasonable: false,
        warning: "Execution every few seconds may cause performance issues",
      };
    }

    return { reasonable: true };
  }
}

export default CronHelper;
