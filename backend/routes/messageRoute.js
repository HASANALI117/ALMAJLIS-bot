const express = require("express");
const messageController = require("../controllers/messageController");

const router = express.Router();

router.get("/", messageController.getMessage);

// router.post("/", messageController.createMessage);

module.exports = router;
