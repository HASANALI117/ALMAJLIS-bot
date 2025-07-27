import { BaseTaskHandler } from "./BaseTaskHandler";
import {
  TaskType,
  TaskCategory,
  TaskConfig,
  NotificationData,
  ReminderData,
} from "../../utils/types";

export class ReminderHandler extends BaseTaskHandler {
  type = TaskType.RECURRING_REMINDER;
  category = TaskCategory.REMINDERS;

  async execute(config: TaskConfig): Promise<ReminderData[]> {
    if (!this.validateConfig(config)) {
      throw new Error("Invalid configuration for ReminderHandler");
    }

    const reminderData: ReminderData = {
      title: config.reminderText || "Reminder",
      description: config.customConfig?.description || "",
      reminderType: "custom",
      targetUsers: config.targetUsers || [],
      eventDate: config.reminderDate,
      recurring: config.customConfig?.recurring || false,
      metadata: config.customConfig || {},
    };

    return [reminderData];
  }

  // Reminders don't need comparison logic
  compare(oldData: any[], newData: any[]): any[] {
    return newData;
  }

  formatForNotification(reminders: ReminderData[]): NotificationData[] {
    return reminders.map((reminder) => {
      let description = reminder.description;

      // Add countdown if event date is provided
      if (reminder.eventDate) {
        const timeUntil = reminder.eventDate.getTime() - Date.now();
        const days = Math.floor(timeUntil / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeUntil % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );

        if (timeUntil > 0) {
          description += `\n\n⏰ Time remaining: ${days}d ${hours}h`;
        } else {
          description += "\n\n🔔 **This event is now!**";
        }
      }

      return {
        title: `🔔 ${reminder.title}`,
        description,
        timestamp: new Date(),
        metadata: {
          reminderType: reminder.reminderType,
          targetUsers: reminder.targetUsers,
          eventDate: reminder.eventDate,
          recurring: reminder.recurring,
          ...reminder.metadata,
        },
      };
    });
  }

  validateConfig(config: TaskConfig): boolean {
    if (!config.reminderText && !config.customConfig?.description) {
      console.error("[ReminderHandler] Reminder text is required");
      return false;
    }
    return true;
  }

  protected getId(reminder: ReminderData): string {
    return `${reminder.reminderType}_${reminder.title}_${Date.now()}`;
  }
}
