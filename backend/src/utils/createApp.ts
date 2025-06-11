import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import routes from "../routes";
import "../config/passport";

export const createApp = (): Express => {
  const app = express();

  //   Enable parser for JSON requests
  app.use(express.json());
  //   Enable CORS
  app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
  //   Enable cookie parsing
  app.use(cookieParser());
  //   Enable session management
  app.use(
    session({
      secret: `${process.env.SESSION_SECRET}`,
      resave: false,
      saveUninitialized: false,
      cookie: {
        //   secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        //   httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      },
      store: MongoStore.create({
        mongoUrl: `${process.env.MONGODB_URI}`,
        collectionName: "sessions",
        ttl: 7 * 24 * 60 * 60, // 7 days in seconds
      }),
    })
  );

  //   Initialize Passport.js for authentication
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/api", routes);

  return app;
};
