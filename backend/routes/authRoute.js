import express from "express";
import { authenticate, callback } from "../controllers/authController.js";

const router = express.Router();

router.get("/signin", authenticate);

router.get("/discord/callback", callback);

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

export default router;
