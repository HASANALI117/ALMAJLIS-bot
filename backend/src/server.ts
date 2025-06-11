import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";
config({ path: "../.env" });

// Routes
import routes from "./routes/";

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
    const app = express();
    app.use(express.json());
    app.use(cors({ origin: "http://localhost:3000", credentials: true }));
    app.use(cookieParser());

    app.use("/api", routes);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error starting the server:", error);
  }
}

main();
