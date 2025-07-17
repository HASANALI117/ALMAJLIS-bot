import { config } from "dotenv";
import { createApp } from "./utils/createApp";
import "./config/database";
config({ path: "../.env" });

const PORT = process.env.PORT || 5000;

async function main() {
  try {
    // Express server setup
    const app = createApp();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error starting the server:", error);
  }
}

main();
