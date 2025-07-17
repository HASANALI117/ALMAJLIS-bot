import { Schema, model } from "mongoose";

const botSettingsSchema = new Schema(
  {
    guildID: { type: String, required: true, unique: true },
    name: { type: String, default: "ALMAJLIS-BOT" },
    prefixes: [{ type: String }],
    status: {
      type: String,
      enum: ["playing", "listening", "watching", "competing"],
      default: "playing",
      text: { type: String, default: "Managing the peasants" },
    },
  },
  { timestamps: true }
);

export default model("BotSettings", botSettingsSchema);
