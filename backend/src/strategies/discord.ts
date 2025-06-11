import passport from "passport";
import { Profile, Strategy as DiscordStrategy } from "passport-discord";
import { VerifyCallback } from "passport-oauth2";
import { config } from "dotenv";
config({ path: "../.env" });

const clientID = `${process.env.DISCORD_CLIENT_ID}`;
const clientSecret = `${process.env.DISCORD_CLIENT_SECRET}`;
const callbackURL = process.env.DISCORD_CALLBACK_URL;

export const discordStrategy = new DiscordStrategy(
  {
    clientID,
    clientSecret,
    callbackURL,
    scope: [
      "identify",
      "email",
      "guilds",
      "applications.commands.permissions.update",
    ],
  },
  async (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) => {}
);
