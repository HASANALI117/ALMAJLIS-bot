const express = require("express");
const axios = require("axios");
const User = require("../models/User");

const router = express.Router();

const DISCORD_OAUTH_URL = process.env.DISCORD_OAUTH_URL;
const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const DISCORD_API_ENDPOINT = process.env.DISCORD_API_ENDPOINT;

exports.authenticate = (req, res) => {
  res.redirect(`${DISCORD_OAUTH_URL}`);
};
exports.callback = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ error: "Authorization code is required" });
    }

    // Exchange code for access token
    const tokenResponse = await axios.post(
      `${DISCORD_API_ENDPOINT}/oauth2/token`,
      new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
        code,
      }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token, refresh_token } = tokenResponse.data;

    // Fetch user details
    const userResponse = await axios.get(`${DISCORD_API_ENDPOINT}/users/@me`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const { id, username, avatar } = userResponse.data;

    // Check if user exists in the database
    const user = await User.findOneAndUpdate(
      { userID: id },
      {
        userID: id,
        username: username,
        avatarHash: avatar,
        accessToken: access_token,
        refreshToken: refresh_token,
      },
      { upsert: true, new: true }
    );

    // Respond with user data
    const message = user.isNew
      ? "New user created"
      : "User updated successfully";

    res.status(200).json({
      message,
      user,
    });

    console.log(userResponse.data);
  } catch (error) {
    console.error("OAuth2 Callback Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};