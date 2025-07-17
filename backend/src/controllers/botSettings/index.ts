import { Request, Response } from "express";
import BotSettings from "../../models/BotSettings";

export const getBotSettingsController = async (req: Request, res: Response) => {
  try {
    const { guildId } = req.params;

    const settings = await BotSettings.findOne({ guildId });

    // Return default settings if none exist
    if (!settings) {
      return res.json({
        guildId,
        nickname: "ALMAJLIS-BOT",
        prefixes: ["!", "?", "."],
        status: {
          type: "playing",
          text: "Managing the peasants",
        },
      });
    }

    res.json(settings);
  } catch (error: any) {
    console.error("Error fetching bot settings:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const setBotSettingsController = async (req: Request, res: Response) => {
  try {
    const { guildId } = req.params;
    const { nickname, prefixes, status } = req.body;

    console.log("Received bot settings data:", req.body);

    if (!guildId) {
      return res.status(400).json({ error: "guildId is required" });
    }

    // Validate prefixes
    if (prefixes && (!Array.isArray(prefixes) || prefixes.length === 0)) {
      return res.status(400).json({ error: "At least one prefix is required" });
    }

    const updateData: any = {
      guildId,
      nickname: nickname || "ALMAJLIS-BOT",
      prefixes: prefixes || ["!", "?", "."],
      status: status || {
        type: "playing",
        text: "Managing the peasants",
        enabled: true,
      },
    };

    const response = await BotSettings.findOneAndUpdate(
      { guildId },
      updateData,
      { upsert: true, new: true }
    );

    res.json({
      message: "Bot settings saved successfully",
      data: response,
    });
  } catch (error: any) {
    console.error("Error saving bot settings:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteBotSettingsController = async (
  req: Request,
  res: Response
) => {
  const { guildId } = req.params;

  try {
    await BotSettings.findOneAndDelete({ guildId });
    res.json({ message: "Bot settings deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting bot settings:", error);
    res.status(500).json({ error: "Failed to delete bot settings" });
  }
};
