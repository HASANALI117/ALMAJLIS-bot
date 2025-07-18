import { Request, Response } from "express";
import { WelcomeSettings } from "../../models";

export const getWelcomeSettingsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { guildId } = req.params;

    const settings = await WelcomeSettings.findOne({ guildId });

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
    const { guildId, channelId, message, useEmbed, embed } = req.body;

    if (!guildId || !channelId) {
      return res
        .status(400)
        .json({ error: "guildId and channelId are required" });
    }

    const response = await WelcomeSettings.findOneAndUpdate(
      { guildId },
      {
        guildId,
        channelId,
        useEmbed: useEmbed || false,
        embed: useEmbed ? embed : null, // Clear embed when NOT using embed
        message: useEmbed ? null : message || null, // Clear message when using embed
      },
      { upsert: true, new: true }
    );

    res.json({
      message: "Welcome settings saved successfully",
      data: response,
    });
  } catch (error: any) {
    console.error("Error saving welcome settings:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteWelcomeSettingsController = async (
  req: Request,
  res: Response
) => {
  const { guildId } = req.params;

  try {
    await WelcomeSettings.findOneAndDelete({ guildId });
    res.json({ message: "Welcome settings deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting welcome settings:", error);
    res.status(500).json({ error: "Failed to delete welcome settings" });
  }
};
