import { Request, Response } from "express";
import {
  getBotGuildsService,
  getUserGuildsService,
} from "../../services/guilds";
import { User } from "../../models/User";

export const getGuildsController = async (req: Request, res: Response) => {
  const user = req.user as User;
  try {
    const { data: botGuilds } = await getBotGuildsService();
    const { data: userGuilds } = await getUserGuildsService(user.id);
    res.status(200).send({ botGuilds, userGuilds });
  } catch (error) {
    console.error("Error fetching guilds:", error);
    res.status(500).json({ error: "Failed to fetch guilds" });
  }
};
