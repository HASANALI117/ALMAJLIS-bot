import { Request, Response } from "express";
import { getUserService } from "../../services/user";
import { User } from "../../models/User";

export const getCurrentUserController = async (req: Request, res: Response) => {
  const user = req.user as User;

  try {
    // Fetch real-time user data from Discord API
    const { data } = await getUserService(user.id);
    res.send(data);
  } catch (error) {
    console.error("Error fetching user data:", error);

    res.status(500).json({
      error: "Failed to fetch user data",
    });
  }
};
