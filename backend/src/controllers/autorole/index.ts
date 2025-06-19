import { Request, Response } from "express";
import { AutoRole } from "../../models";

export const getAutoroleSettingsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { guildId } = req.params;

    const settings = await AutoRole.findOne({ guildId });

    if (!settings) {
      return res.json({ enabled: false, roleId: null });
    }

    res.json({
      enabled: true,
      roleId: settings.roleId,
    });
  } catch (error: any) {
    console.error("Error fetching autorole settings:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const setAutoroleSettingsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { guildId } = req.params;
    const { enabled, roleId } = req.body;

    if (enabled && !roleId) {
      return res.status(400).json({
        error: "roleId is required when autorole is enabled",
      });
    }

    if (enabled) {
      // Create or update autorole setting
      const settings = await AutoRole.findOneAndUpdate(
        { guildId },
        { guildId, roleId },
        { upsert: true, new: true }
      );
      res.json({
        message: "Autorole settings updated successfully",
        data: settings,
      });
    } else {
      // Disable autorole by deleting the record
      await AutoRole.findOneAndDelete({ guildId });
      res.json({
        message: "Autorole disabled successfully",
      });
    }
  } catch (error: any) {
    console.error("Error updating autorole settings:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteAutoroleSettingsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { guildId } = req.params;

    await AutoRole.findOneAndDelete({ guildId });

    res.json({ message: "Autorole settings deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting autorole settings:", error.message);
    res.status(500).json({ error: error.message });
  }
};
