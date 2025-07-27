import { Router } from "express";
import { automationController } from "../../controllers/automation";
import { validateTaskData } from "../../utils/middlewares";

const router = Router();

// Task CRUD operations
router.post("/tasks", validateTaskData, automationController.createTask);
router.get("/tasks/guild/:guildId", automationController.getGuildTasks);
router.get("/tasks/:taskId", automationController.getTask);
router.put("/tasks/:taskId", validateTaskData, automationController.updateTask);
router.delete("/tasks/:taskId", automationController.deleteTask);

// Task execution
router.post("/tasks/:taskId/execute", automationController.executeTask);

// System info
router.get("/handlers", automationController.getHandlers);

export default router;
