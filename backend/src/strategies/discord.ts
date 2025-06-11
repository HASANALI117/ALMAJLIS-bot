import passport from "passport";
import { Profile, Strategy as DiscordStrategy } from "passport-discord";
import { VerifyCallback } from "passport-oauth2";
import { config } from "dotenv";
import { User } from "../models";
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
  ) => {
    try {
      const { id } = profile;
      const user = await User.findOneAndUpdate(
        { discordId: id },
        {
          discordId: id,
          accessToken,
          refreshToken,
        },
        { new: true, upsert: true }
      );

      return done(null, user);
    } catch (error) {
      console.error("Error in Discord strategy:", error);
      return done(error, undefined);
    }
  }
);
