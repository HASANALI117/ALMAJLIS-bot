import { Request, Response } from "express";
import { getBotGuildsService } from "../../services/guilds";

export const getGuildsController = async (req: Request, res: Response) => {
  try {
    const { data } = await getBotGuildsService();
    res.status(200).send(data);
  } catch (error) {
    console.error("Error fetching guilds:", error);
    res.status(500).json({ error: "Failed to fetch guilds" });
  }
};
