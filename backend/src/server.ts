import { config } from "dotenv";
import { createApp } from "./utils/createApp";
import "./config/database";
import { closeRedisConnection, initializeRedis } from "./services/redis";
config({ path: "../.env" });

const PORT = process.env.PORT || 5000;

async function main() {
  try {
    // Initialize Redis
    await initializeRedis();

    // Express server setup
    const app = createApp();

    const server = app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      console.log("🔄 Shutting down server...");
      await closeRedisConnection();
      server.close(() => {
        console.log("✅ Server shut down gracefully");
        process.exit(0);
      });
    });
  } catch (error) {
    console.log("Error starting the server:", error);
  }
}

main();
