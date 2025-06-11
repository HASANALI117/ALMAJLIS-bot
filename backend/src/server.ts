import mongoose from "mongoose";
import { config } from "dotenv";
import { createApp } from "./utils/createApp";
config({ path: "../.env" });

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 8000;

async function main() {
  try {
    // Connect to MongoDB
    mongoose
      .connect(`${MONGODB_URI}`)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.error("Failed to connect to MongoDB", err));

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
