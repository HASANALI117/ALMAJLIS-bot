import axios from "axios";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// This function initiates the OAuth2 authentication flow with Discord
export const authenticate = (req, res) => {
  const DISCORD_OAUTH_URL = process.env.DISCORD_OAUTH_URL;
  res.redirect(`${DISCORD_OAUTH_URL}`);
};

// This function handles the OAuth2 callback from Discord after user authentication
export const callback = async (req, res) => {
  const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;
  const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
  const DISCORD_API_ENDPOINT = process.env.DISCORD_API_ENDPOINT;
  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

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

    // Generate JWT token
    const jwtToken = jwt.sign(
      { userID: id, username: username, avatarHash: avatar },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    // Set JWT token in cookies
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false,
      maxAge: 6.048e8,
    });

    // Redirect to the frontend dashboard
    res.redirect("http://localhost:3000/guilds");
  } catch (error) {
    console.error("OAuth2 Callback Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
