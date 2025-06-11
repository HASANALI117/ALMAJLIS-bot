import { Request, Response } from "express";
import { getGuildService, getMutualGuildsService } from "../../services/guilds";
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

export const getGuildPermissionsController = async (
  req: Request,
  res: Response
) => {
  const user = req.user as User;
  const { id } = req.params;
  try {
    const guilds = await getMutualGuildsService(user.id);
    const valid = guilds.some((guild) => guild.id === id);
    return valid ? res.sendStatus(200) : res.sendStatus(403);
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Error" });
  }
};

export const getGuildController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { data: guild } = await getGuildService(id);
    res.send(guild);
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Error" });
  }
};
