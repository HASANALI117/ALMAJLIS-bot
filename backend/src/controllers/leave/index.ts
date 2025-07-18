import { Request, Response } from "express";
import { LeaveSettings } from "../../models";

export const getLeaveSettingsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { guildId } = req.params;

    const settings = await LeaveSettings.findOne({ guildId });

    res.json(settings);
  } catch (error: any) {
    console.error("Error fetching leave settings:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const setLeaveSettingsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { guildId, channelId, enabled, message, useEmbed, embed } = req.body;

    if (!guildId || !channelId) {
      return res
        .status(400)
        .json({ error: "guildId and channelId are required" });
    }

    const response = await LeaveSettings.findOneAndUpdate(
      { guildId },
      {
        guildId,
        channelId,
        enabled: enabled !== undefined ? enabled : true, // Default to true if not provided
        useEmbed: useEmbed || false,
        embed: useEmbed ? embed : null, // Clear embed when NOT using embed
        message: useEmbed ? null : message || null, // Clear message when using embed
      },
      { upsert: true, new: true }
    );

    res.json({
      message: "Leave settings saved successfully",
      data: response,
    });
  } catch (error: any) {
    console.error("Error saving leave settings:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteLeaveSettingsController = async (
  req: Request,
  res: Response
) => {
  const { guildId } = req.params;

  try {
    await LeaveSettings.findOneAndDelete({ guildId });
    res.json({ message: "Leave settings deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting leave settings:", error);
    res.status(500).json({ error: "Failed to delete leave settings" });
  }
};
