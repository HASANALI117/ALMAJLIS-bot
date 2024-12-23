const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/signin", authController.authenticate);

router.get("/discord/callback", authController.callback);

// router.get("/discord", authController.authenticate);
// router.get("/discord/callback", authController.callback);
// router.get("/discord/success", (req, res) =>
//   res.send("Authentication successful!")
// );
// router.get("/discord/failure", (req, res) =>
//   res.send("Authentication failed!")
// );
// router.get("/user", authController.getUserDetails);
// router.get("/logout", authController.logout);

module.exports = router;
