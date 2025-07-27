import cron from "node-cron";
import { AutomationTask } from "../../utils/types";
import { taskHandlerService } from "../../server";
import AutomationTaskModel from "../../models/AutomationTask";
import TaskResultModel from "../../models/TaskResult";

interface ScheduledTask {
  task: cron.ScheduledTask;
  config: AutomationTask;
  isRunning: boolean;
}

class TaskSchedulerService {
  private scheduledTasks: Map<string, ScheduledTask> = new Map();

  async startTask(taskConfig: AutomationTask): Promise<void> {
    this.stopTask(taskConfig.id);

    if (!taskConfig.isActive || !taskConfig.schedule.enabled) {
      console.log(`Task ${taskConfig.name} is disabled`);
      return;
    }

    const { schedule } = taskConfig;
    let cronExpression: string;

    if (schedule.type === "cron" && schedule.cronExpression) {
      cronExpression = schedule.cronExpression;
    } else if (schedule.type === "interval" && schedule.interval) {
      cronExpression = this.intervalToCron(schedule.interval);
    } else if (schedule.type === "one_time" && schedule.executeAt) {
      await this.scheduleOneTimeTask(taskConfig);
      return;
    } else {
      throw new Error(
        `Invalid schedule configuration for task ${taskConfig.name}`
      );
    }

    if (!cron.validate(cronExpression)) {
      throw new Error(`Invalid cron expression: ${cronExpression}`);
    }

    const task = cron.schedule(
      cronExpression,
      async () => {
        await this.executeTaskSafely(taskConfig.id);
      },
      {
        scheduled: false,
        timezone: schedule.timezone || "UTC",
      }
    );

    this.scheduledTasks.set(taskConfig.id, {
      task,
      config: taskConfig,
      isRunning: false,
    });

    task.start();

    if (schedule.runOnStartup) {
      await this.executeTaskSafely(taskConfig.id);
    }

    console.log(`Task scheduled: ${taskConfig.name}`);
  }

  stopTask(taskId: string): void {
    const scheduledTask = this.scheduledTasks.get(taskId);
    if (scheduledTask) {
      scheduledTask.task.stop();
      scheduledTask.task.destroy();
      this.scheduledTasks.delete(taskId);
    }
  }

  async stopAllTasks(): Promise<void> {
    for (const [taskId] of this.scheduledTasks) {
      this.stopTask(taskId);
    }
  }

  private async scheduleOneTimeTask(taskConfig: AutomationTask): Promise<void> {
    const { executeAt } = taskConfig.schedule;
    if (!executeAt) return;

    const delay = executeAt.getTime() - Date.now();
    if (delay <= 0) {
      await this.executeTaskSafely(taskConfig.id);
      return;
    }

    const timeout = setTimeout(async () => {
      await this.executeTaskSafely(taskConfig.id);
      await AutomationTaskModel.findByIdAndUpdate(taskConfig.id, {
        isActive: false,
        "schedule.enabled": false,
      });
    }, delay);

    // Store timeout reference
    this.scheduledTasks.set(taskConfig.id, {
      task: {
        stop: () => clearTimeout(timeout),
        destroy: () => {},
        start: () => {},
        getStatus: () => "scheduled",
      } as any,
      config: taskConfig,
      isRunning: false,
    });
  }

  private async executeTaskSafely(taskId: string): Promise<void> {
    const scheduledTask = this.scheduledTasks.get(taskId);
    if (!scheduledTask) return;

    const { config } = scheduledTask;

    if (config.schedule.skipDuplicates && scheduledTask.isRunning) {
      console.log(`Skipping task ${taskId} - already running`);
      return;
    }

    scheduledTask.isRunning = true;

    try {
      const result = await taskHandlerService.executeTask(config);
      await TaskResultModel.create(result);

      // Update task metadata
      await AutomationTaskModel.findByIdAndUpdate(taskId, {
        lastRun: result.executedAt,
        $inc: { "schedule.executionCount": 1 },
        ...(result.status === "error"
          ? {
              $inc: { errorCount: 1 },
              lastError: result.error,
            }
          : {
              lastError: null,
            }),
      });
    } catch (error) {
      console.error(`Failed to execute task ${taskId}:`, error);

      await AutomationTaskModel.findByIdAndUpdate(taskId, {
        $inc: { errorCount: 1 },
        lastError: error instanceof Error ? error.message : String(error),
        lastRun: new Date(),
      });
    } finally {
      scheduledTask.isRunning = false;
    }
  }

  private intervalToCron(intervalMs: number): string {
    const minutes = Math.floor(intervalMs / (1000 * 60));
    if (minutes < 60) {
      return `0 */${Math.max(1, minutes)} * * * *`;
    }
    const hours = Math.floor(minutes / 60);
    return `0 0 */${Math.max(1, hours)} * * *`;
  }

  isTaskActive(taskId: string): boolean {
    const task = this.scheduledTasks.get(taskId);
    return task ? task.task.getStatus() === "scheduled" : false;
  }
}

export const taskSchedulerService = new TaskSchedulerService();
