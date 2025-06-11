import { Request, Response } from "express";
import { getMutualGuildsService } from "../../services/guilds";
import { User } from "../../models/User";

export const getGuildsController = async (req: Request, res: Response) => {
  const user = req.user as User;
  try {
    const guilds = await getMutualGuildsService(user.id);
    res.status(200).send(guilds);
  } catch (error) {
    console.error("Error fetching guilds:", error);
    res.status(500).json({ error: "Failed to fetch guilds" });
  }
};
