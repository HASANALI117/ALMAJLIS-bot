import { Request, Response } from "express";

export const handleDiscordRedirect = (req: Request, res: Response) => {
  console.log("Redirecting to Discord for authentication...");
};

export const handleDiscordCallback = (req: Request, res: Response) => {
  console.log("Authentication successful! You can close this window.");
  res.redirect(`${process.env.FRONTEND_URL}/guilds`);
};
