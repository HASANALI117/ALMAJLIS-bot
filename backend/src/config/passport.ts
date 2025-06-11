import passport from "passport";
import { discordStrategy } from "../strategies/discord";
import { User } from "../models";

//   Use the Discord strategy
passport.use(discordStrategy);

// Serialize user for session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    return user ? done(null, user) : done(new Error("User not found"), null);
  } catch (error) {
    console.error("Error deserializing user:", error);
    done(error, null);
  }
});

export default passport;
