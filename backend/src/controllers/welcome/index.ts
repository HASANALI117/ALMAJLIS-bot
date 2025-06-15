import { Request, Response } from "express";
import WelcomeChannel from "../../models/WelcomeChannel";

export const getWelcomeSettingsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { guildId } = req.params;

    const settings = await WelcomeChannel.findOne({ guildId });

    res.json(settings);
  } catch (error: any) {
    console.error("Error fetching welcome settings:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const setWelcomeSettingsController = async (
  req: Request,
  res: Response
) => {
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
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteWelcomeSettingsController = async (
  req: Request,
  res: Response
) => {
  const { guildId } = req.params;

  try {
    await WelcomeChannel.findOneAndDelete({ guildId });
    res.json({ message: "Welcome settings deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting welcome settings:", error);
    res.status(500).json({ error: "Failed to delete welcome settings" });
  }
};
