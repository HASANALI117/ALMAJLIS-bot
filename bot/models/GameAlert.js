import { Schema, model } from "mongoose";

const gameAlertSchema = new Schema(
  {
    guildId: { type: String, required: true },
    channelId: { type: String, required: true },
    gameTitle: { type: String, required: true },
    steamAppID: { type: String },
    maxPrice: { type: Number, required: true, default: 60 },
    minDiscountPercent: { type: Number, required: true, default: 50 },
    isActive: { type: Boolean, default: true },
    lastNotified: { type: Date, default: null },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("GameAlert", gameAlertSchema);
