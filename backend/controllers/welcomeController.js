import WelcomeChannel from "../models/WelcomeChannel.js";

export const getWelcomeSettings = async (req, res) => {
  try {
    const { guildId } = req.params;

    const settings = await WelcomeChannel.findOne({ guildId });

    res.json(settings);
  } catch (error) {
    console.error("Error fetching welcome settings:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const setWelcomeChannel = async (req, res) => {
  try {
    const { guildId, channelId, message } = req.body;
    if (!guildId || !channelId) {
      return res
        .status(400)
        .json({ error: "guildId and channelId are required" });
    }

    const response = await WelcomeChannel.findOneAndUpdate(
      { guildId },
      { guildId, channelId, message: message || null },
      { upsert: true, new: true }
    );

    res.json({ message: "Welcome channel set successfully", data: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
