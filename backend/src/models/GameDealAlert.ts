import { Schema, model } from "mongoose";

const priceSchema = new Schema(
  {
    amount: { type: Number, required: true },
    amountInt: { type: Number, required: true },
    currency: { type: String, required: true, match: /^[A-Z]{3}$/ },
  },
  { _id: false }
);

const shopSchema = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
  },
  { _id: false }
);

const drmSchema = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
  },
  { _id: false }
);

const platformSchema = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
  },
  { _id: false }
);

const dealSchema = new Schema(
  {
    shop: { type: shopSchema, required: true },
    price: { type: priceSchema, required: true },
    regular: { type: priceSchema, required: true },
    cut: { type: Number, required: true, min: 0, max: 100 },
    voucher: { type: String, default: null },
    storeLow: { type: priceSchema, default: null },
    flag: {
      type: String,
      enum: ["H", "N", "S", null],
      default: null,
    },
    drm: [drmSchema],
    platforms: [platformSchema],
    timestamp: { type: Date, required: true },
    expiry: { type: Date, default: null },
    url: { type: String, required: true },
  },
  { _id: false }
);

const gameSchema = new Schema(
  {
    id: { type: String, required: true },
    slug: { type: String, required: true },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["game", "dlc", "package", null],
      default: null,
    },
    mature: { type: Boolean, required: true },
    historyLow: { type: priceSchema, default: null },
    lastPrice: { type: priceSchema, default: null },
    deals: [dealSchema],
  },
  { _id: false }
);

const gameDealAlertSchema = new Schema(
  {
    // Webhook metadata
    hookId: { type: String, required: true }, // ITAD-Hook-ID
    eventType: { type: String, required: true }, // ITAD-Event

    // For ping events
    pingPayload: { type: String, default: null },

    // For waitlist notification events
    games: [gameSchema],

    // Processing status
    processed: { type: Boolean, default: false },
    notificationSent: { type: Boolean, default: false },

    // Discord-specific data (for future use)
    discordChannelId: { type: String, default: null },
    discordUserId: { type: String, default: null },
    discordGuildId: { type: String, default: null },
  },
  { timestamps: true }
);

// Add indexes for better query performance
gameDealAlertSchema.index({ hookId: 1, createdAt: -1 });
gameDealAlertSchema.index({ eventType: 1 });
gameDealAlertSchema.index({ processed: 1 });

export default model("GameDealAlert", gameDealAlertSchema);
