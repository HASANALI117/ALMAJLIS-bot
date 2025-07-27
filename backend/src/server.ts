import { config } from "dotenv";
import { createApp } from "./utils/createApp";
import "./config/database";
import { closeRedisConnection, initializeRedis } from "./services/redis";
import { setupGracefulShutdown } from "./utils/gracefulShutdown";
import { TaskHandlerService } from "./services/task-handler";
config({ path: "../.env" });

const PORT = process.env.PORT || 5000;

// Initialize Redis
initializeRedis();

// Task handler service initialization
export const taskHandlerService = new TaskHandlerService();

function main() {
  try {
    // Express server setup
    const app = createApp();

    const server = app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

    // Graceful shutdown
    setupGracefulShutdown(server, closeRedisConnection);
  } catch (error) {
    console.log("Error starting the server:", error);
  }
}

main();
