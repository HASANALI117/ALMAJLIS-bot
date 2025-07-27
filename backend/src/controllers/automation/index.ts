import { Request, Response } from "express";
import { automationService } from "../../services/automation";
import { taskHandlerService } from "../../services/task-handler";

export const automationController = {
  // Create new automation task
  async createTask(req: Request, res: Response) {
    try {
      const task = await automationService.createTask(req.body);
      res.status(201).json({
        success: true,
        data: task,
        message: "Automation task created successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to create task",
      });
    }
  },

  // Get tasks for a guild
  async getGuildTasks(req: Request, res: Response) {
    try {
      const { guildId } = req.params;
      const { category, taskType, isActive } = req.query;

      const filters: any = {};
      if (category) filters.category = category;
      if (taskType) filters.taskType = taskType;
      if (isActive !== undefined) filters.isActive = isActive === "true";

      const tasks = await automationService.getTasksByGuild(guildId, filters);
      res.json({
        success: true,
        data: tasks,
        count: tasks.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to fetch tasks",
      });
    }
  },

  // Get specific task details
  async getTask(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      const status = await automationService.getTaskStatus(taskId);

      if (!status) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      res.json({
        success: true,
        data: status,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to fetch task",
      });
    }
  },

  // Update task
  async updateTask(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      const task = await automationService.updateTask(taskId, req.body);

      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      res.json({
        success: true,
        data: task,
        message: "Task updated successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to update task",
      });
    }
  },

  // Delete task
  async deleteTask(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      const deleted = await automationService.deleteTask(taskId);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      res.json({
        success: true,
        message: "Task deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to delete task",
      });
    }
  },

  // Execute task manually
  async executeTask(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      const result = await automationService.executeTaskManually(taskId);

      res.json({
        success: true,
        data: result,
        message: "Task executed successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to execute task",
      });
    }
  },

  // Get available task handlers
  async getHandlers(req: Request, res: Response) {
    try {
      const handlers = taskHandlerService.getRegisteredHandlers();
      res.json({
        success: true,
        data: handlers,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch handlers",
      });
    }
  },
};
