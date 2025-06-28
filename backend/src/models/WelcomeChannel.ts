import { Schema, model } from "mongoose";

const welcomeChannelSchema = new Schema(
  {
    guildId: { type: String, required: true },
    channelId: { type: String, required: true, unique: true },
    message: { type: String, default: null },
    useEmbed: { type: Boolean, default: false },
    embed: {
      title: { type: String, default: "Welcome!" },
      description: { type: String, default: "Welcome to {server}, {user}! 🎉" },
      color: { type: String, default: "#5865F2" },
      thumbnail: { type: Boolean, default: true },
      footer: {
        text: { type: String, default: "Member #{membercount}" },
        iconURL: { type: String, default: null },
      },
      author: {
        name: { type: String, default: null },
        iconURL: { type: String, default: null },
      },
      fields: [
        {
          name: { type: String },
          value: { type: String },
          inline: { type: Boolean, default: false },
        },
      ],
    },
  },
  { timestamps: true }
);

export default model("WelcomeChannel", welcomeChannelSchema);
