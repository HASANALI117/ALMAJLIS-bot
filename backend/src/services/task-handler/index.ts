import {
  TaskHandler,
  TaskType,
  AutomationTask,
  TaskResult,
  TaskStatus,
} from "../../utils/types";
import { GameDealsHandler } from "../../utils/taskHandlers/GameDealsHandler";
import { ReminderHandler } from "../../utils/taskHandlers/ReminderHandler";
import Redis from "ioredis";
import { getRedisClient } from "../redis";

class TaskHandlerService {
  private handlers: Map<TaskType, TaskHandler> = new Map();
  private redis: Redis;

  constructor() {
    this.redis = getRedisClient();
    this.registerDefaultHandlers();
  }

  private registerDefaultHandlers(): void {
    this.registerHandler(new GameDealsHandler());
    this.registerHandler(new ReminderHandler());
  }

  registerHandler(handler: TaskHandler): void {
    this.handlers.set(handler.type, handler);
    console.log(
      `Registered task handler: ${handler.type} (${handler.category})`
    );
  }

  getHandler(type: TaskType): TaskHandler | undefined {
    return this.handlers.get(type);
  }

  async executeTask(task: AutomationTask): Promise<TaskResult> {
    const startTime = Date.now();

    try {
      console.log(`Executing task: ${task.name} (${task.id})`);

      const handler = this.handlers.get(task.taskType);
      if (!handler) {
        throw new Error(`No handler found for task type: ${task.taskType}`);
      }

      if (!handler.validateConfig(task.taskConfig)) {
        throw new Error(
          `Invalid configuration for task type: ${task.taskType}`
        );
      }

      // Execute task
      const fetchStartTime = Date.now();
      const newData = await handler.execute(task.taskConfig);
      const responseTime = Date.now() - fetchStartTime;

      let status: TaskStatus;
      let newItems: any[] = [];
      let itemsFound = newData.length;

      // For monitoring tasks, compare with cached data
      if (handler.compare && handler.category === "monitoring") {
        const cacheKey = `task:${task.id}:lastData`;
        const cachedData = await this.redis.get(cacheKey);
        const previousData = cachedData ? JSON.parse(cachedData) : [];

        newItems = handler.compare(previousData, newData);

        // Cache new data
        await this.redis.setex(
          cacheKey,
          7 * 24 * 60 * 60,
          JSON.stringify(newData)
        );

        status =
          newItems.length > 0 ? TaskStatus.SUCCESS : TaskStatus.NO_CHANGES;
      } else {
        // For reminders, all data is "new"
        newItems = newData;
        status =
          newItems.length > 0 ? TaskStatus.SUCCESS : TaskStatus.NO_CHANGES;
      }

      const result: TaskResult = {
        taskId: task.id,
        executedAt: new Date(),
        status,
        itemsFound,
        newItems: newItems.length,
        data: newItems,
        duration: Date.now() - startTime,
        responseTime,
      };

      // Publish events for new items
      if (newItems.length > 0) {
        await this.publishTaskEvent(task, newItems, handler);
      }

      return result;
    } catch (error) {
      console.error(`Task execution failed for ${task.name}:`, error);

      return {
        taskId: task.id,
        executedAt: new Date(),
        status: TaskStatus.ERROR,
        itemsFound: 0,
        newItems: 0,
        data: [],
        error: error instanceof Error ? error.message : String(error),
        duration: Date.now() - startTime,
      };
    }
  }

  private async publishTaskEvent(
    task: AutomationTask,
    newItems: any[],
    handler: TaskHandler
  ): Promise<void> {
    try {
      const notifications = handler.formatForNotification(newItems);

      const event = {
        taskId: task.id,
        type:
          handler.category === "reminders"
            ? "reminder_triggered"
            : "new_items_found",
        data: {
          task,
          notifications,
          itemCount: newItems.length,
        },
        timestamp: new Date(),
      };

      await this.redis.publish("automation_events", JSON.stringify(event));
    } catch (error) {
      console.error("Failed to publish task event:", error);
    }
  }

  getRegisteredHandlers(): TaskType[] {
    return Array.from(this.handlers.keys());
  }
}

export const taskHandlerService = new TaskHandlerService();
