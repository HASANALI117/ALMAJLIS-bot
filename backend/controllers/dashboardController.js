const axios = require("axios");

const DISCORD_API_ENDPOINT = process.env.DISCORD_API_ENDPOINT;

exports.getDashboardData = async (req, res) => {
  try {
    if (req.user) {
      const user = req.user;
      const dashboardData = {
        userID: user.userID,
        username: user.username,
        avatar: user.avatarHash,
      };
      res.json(dashboardData);
    } else {
      res.json({ error: "User not logged in" });
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getGuilds = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not logged in" });
    }

    // const access_token = req.user.accessToken;

    const guildResponse = await axios.get(
      `${DISCORD_API_ENDPOINT}/users/@me/guilds`,
      { headers: { Authorization: `Bearer ${req.user.accessToken}` } }
    );

    // const { id, username, avatar } = userResponse.data;

    res.json(guildResponse.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
