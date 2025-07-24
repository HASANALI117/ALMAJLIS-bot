export function setupGracefulShutdown(
  server: any,
  cleanup: () => Promise<void>
) {
  const shutdown = async () => {
    console.log("🔄 Shutting down server...");
    await cleanup();
    server.close(() => {
      console.log("✅ Server shut down gracefully");
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}
