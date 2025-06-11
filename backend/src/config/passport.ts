import passport from "passport";
import { discordStrategy } from "../strategies/discord";

//   Use the Discord strategy
passport.use(discordStrategy);

export default passport;
