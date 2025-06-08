import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import authRoute from "./routes/authRoute.js";
import messageRoute from "./routes/messageRoute.js";
import dashboardRoute from "./routes/dashboardRoute.js";
// Middlewares
import { authenticateToken } from "./middlewares/authMiddleware.js";

dotenv.config({ path: "../.env" });

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Express server setup
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/message", authenticateToken, messageRoute);
app.use("/dashboard", authenticateToken, dashboardRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
