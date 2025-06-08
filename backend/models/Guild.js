import { Schema, model } from "mongoose";

const guildSchema = new Schema(
  {
    guildID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    welcomeChannel: { type: String, default: "welcome" },
    welcomeMessage: {
      type: String,
      default:
        "Welcome to the server, {member}! 🎉 We’re glad to have you here.",
    },
  },
  { timestamps: true }
);

export default model("Guild", guildSchema);
