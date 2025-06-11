import { Request, Response } from "express";

export const handleDiscordRedirect = (req: Request, res: Response) => {
  res.send("Redirecting to Discord for authentication...");
};

export const handleDiscordCallback = (req: Request, res: Response) => {
  res.send("Authentication successful! You can close this window.");
};
