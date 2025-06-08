import axios from "axios";

const DISCORD_API_ENDPOINT = process.env.DISCORD_API_ENDPOINT;
const MANAGE_GUILD_BIT = 1 << 5; // 0x20 (MANAGE_GUILD permission)
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;

export const getDashboardData = async (req, res) => {
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

export const getGuilds = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not logged in" });
    }

    const guildResponse = await axios.get(
      `${DISCORD_API_ENDPOINT}/users/@me/guilds`,
      { headers: { Authorization: `Bearer ${req.user.accessToken}` } }
    );

    // Filter guilds where the user has MANAGE_GUILD (Manage Server) permission
    const filteredGuilds = guildResponse.data.filter(
      (guild) => (guild.permissions & MANAGE_GUILD_BIT) === MANAGE_GUILD_BIT
    );

    res.json(filteredGuilds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const inviteBot = async (req, res) => {
  try {
    const { guildID } = req.params;
    if (!guildID) {
      return res.status(400).json({ error: "Guild ID is required" });
    }

    const inviteURL = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&scope=bot&permissions=364870364415&guild_id=${guildID}`;

    res.json({ inviteURL });

    console.log(inviteURL);
  } catch (error) {
    console.error("Error creating bot invite URL:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
