import {
  AutomationTask,
  TaskResult,
  TaskType,
  TaskCategory,
} from "../../utils/types";
import AutomationTaskModel from "../../models/AutomationTask";
import TaskResultModel from "../../models/TaskResult";
import { taskSchedulerService } from "../task-scheduler";
import { taskHandlerService } from "../task-handler";

class AutomationService {
  async createTask(taskData: Partial<AutomationTask>): Promise<AutomationTask> {
    // Validate task configuration
    if (taskData.taskConfig && taskData.taskType) {
      const handler = taskHandlerService.getHandler(taskData.taskType);
      if (!handler?.validateConfig(taskData.taskConfig)) {
        throw new Error("Invalid task configuration");
      }
    }

    // Set default notification config based on task type
    if (!taskData.notificationConfig) {
      taskData.notificationConfig = this.getDefaultNotificationConfig(
        taskData.taskType!
      );
    }

    // Set category based on task type
    taskData.category = this.getCategoryForTaskType(taskData.taskType!);

    const task = await AutomationTaskModel.create(taskData);
    const taskObject = task.toObject() as AutomationTask;

    // Start scheduling if active
    if (taskObject.isActive && taskObject.schedule.enabled) {
      await taskSchedulerService.startTask(taskObject);
    }

    return taskObject;
  }

  async updateTask(
    taskId: string,
    updates: Partial<AutomationTask>
  ): Promise<AutomationTask | null> {
    const task = await AutomationTaskModel.findByIdAndUpdate(taskId, updates, {
      new: true,
    });
    if (!task) return null;

    const taskObject = task.toObject() as AutomationTask;

    // Restart scheduling
    taskSchedulerService.stopTask(taskId);
    if (taskObject.isActive && taskObject.schedule.enabled) {
      await taskSchedulerService.startTask(taskObject);
    }

    return taskObject;
  }

  async deleteTask(taskId: string): Promise<boolean> {
    taskSchedulerService.stopTask(taskId);
    const result = await AutomationTaskModel.findByIdAndDelete(taskId);

    if (result) {
      await TaskResultModel.deleteMany({ taskId });
    }

    return !!result;
  }

  async getTasksByGuild(
    guildId: string,
    filters?: any
  ): Promise<AutomationTask[]> {
    const query = { guildId, ...filters };
    const tasks = await AutomationTaskModel.find(query).sort({ createdAt: -1 });
    return tasks.map((task) => task.toObject() as AutomationTask);
  }

  async getTaskById(taskId: string): Promise<AutomationTask | null> {
    const task = await AutomationTaskModel.findById(taskId);
    return task ? (task.toObject() as AutomationTask) : null;
  }

  async getTaskStatus(taskId: string): Promise<any> {
    const task = await AutomationTaskModel.findById(taskId);
    if (!task) return null;

    const recentResults = await TaskResultModel.find({ taskId })
      .sort({ executedAt: -1 })
      .limit(10);

    return {
      task: task.toObject(),
      isRunning: taskSchedulerService.isTaskActive(taskId),
      recentResults,
      stats: {
        totalRuns: await TaskResultModel.countDocuments({ taskId }),
        successRate: await this.calculateSuccessRate(taskId),
        avgDuration: await this.calculateAverageDuration(taskId),
      },
    };
  }

  async executeTaskManually(taskId: string): Promise<TaskResult> {
    const task = await AutomationTaskModel.findById(taskId);
    if (!task) throw new Error("Task not found");

    const result = await taskHandlerService.executeTask(
      task.toObject() as AutomationTask
    );
    await TaskResultModel.create(result);

    return result;
  }

  async initializeActiveTasks(): Promise<void> {
    console.log("Initializing active automation tasks...");

    const activeTasks = await AutomationTaskModel.find({
      isActive: true,
      "schedule.enabled": true,
    });

    console.log(`Found ${activeTasks.length} active tasks to initialize`);

    for (const task of activeTasks) {
      try {
        await taskSchedulerService.startTask(task.toObject() as AutomationTask);
      } catch (error) {
        console.error(`Failed to initialize task ${task.name}:`, error);
      }
    }
  }

  private getDefaultNotificationConfig(taskType: TaskType): any {
    const configs = {
      [TaskType.GAME_DEALS]: {
        embedTemplate: {
          title: "🎮 New Game Deals Found!",
          color: "#00FF00",
          footer: "ALMAJLIS Bot • IsThereAnyDeal",
        },
      },
      [TaskType.RECURRING_REMINDER]: {
        embedTemplate: {
          title: "🔔 Reminder",
          color: "#FFA500",
          footer: "ALMAJLIS Bot • Reminder System",
        },
      },
      [TaskType.BIRTHDAY_REMINDER]: {
        embedTemplate: {
          title: "🎂 Birthday Reminder",
          color: "#FF69B4",
          footer: "ALMAJLIS Bot • Birthday System",
        },
      },
    };

    return (
      configs[taskType] || {
        embedTemplate: {
          title: "🔔 Automation Update",
          color: "#0099FF",
          footer: "ALMAJLIS Bot • Automation Engine",
        },
      }
    );
  }

  private getCategoryForTaskType(taskType: TaskType): TaskCategory {
    const categoryMap = {
      [TaskType.GAME_DEALS]: TaskCategory.MONITORING,
      [TaskType.YOUTUBE_VIDEOS]: TaskCategory.MONITORING,
      [TaskType.ANIME_UPDATES]: TaskCategory.MONITORING,
      [TaskType.RSS_FEED]: TaskCategory.MONITORING,
      [TaskType.CUSTOM_API]: TaskCategory.MONITORING,
      [TaskType.ONE_TIME_REMINDER]: TaskCategory.REMINDERS,
      [TaskType.RECURRING_REMINDER]: TaskCategory.REMINDERS,
      [TaskType.BIRTHDAY_REMINDER]: TaskCategory.REMINDERS,
      [TaskType.EVENT_REMINDER]: TaskCategory.EVENTS,
      [TaskType.BACKUP_REMINDER]: TaskCategory.MAINTENANCE,
      [TaskType.MAINTENANCE_REMINDER]: TaskCategory.MAINTENANCE,
    };

    return categoryMap[taskType] || TaskCategory.CUSTOM;
  }

  private async calculateSuccessRate(taskId: string): Promise<number> {
    const total = await TaskResultModel.countDocuments({ taskId });
    if (total === 0) return 0;

    const successful = await TaskResultModel.countDocuments({
      taskId,
      status: { $in: ["success", "no_changes", "completed"] },
    });

    return Math.round((successful / total) * 100);
  }

  private async calculateAverageDuration(taskId: string): Promise<number> {
    const results = await TaskResultModel.aggregate([
      { $match: { taskId } },
      { $group: { _id: null, avgDuration: { $avg: "$duration" } } },
    ]);

    return results.length > 0 ? Math.round(results[0].avgDuration) : 0;
  }
}

export const automationService = new AutomationService();
