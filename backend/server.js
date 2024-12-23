const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

// Routes
const messageRoute = require("./routes/messageRoute");
const authRoute = require("./routes/authRoute");

// Middlewares
const authenticateToken = require("./middlewares/authMiddleware");

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Express server setup
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/message", authenticateToken, messageRoute);
app.use("/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
