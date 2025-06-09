import { Schema, model } from "mongoose";

const welcomeChannelSchema = new Schema(
  {
    guildId: { type: String, required: true },
    channelId: { type: String, required: true, unique: true },
    message: { type: String, default: null },
  },
  { timestamps: true }
);

export default model("WelcomeChannel", welcomeChannelSchema);
