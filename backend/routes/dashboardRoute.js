const express = require("express");
const dashboardController = require("../controllers/dashboardController");

const router = express.Router();

router.get("/", dashboardController.getDashboardData);
router.get("/guilds", dashboardController.getGuilds);

module.exports = router;
