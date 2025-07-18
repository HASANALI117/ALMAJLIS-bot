import { Schema, model } from "mongoose";

const leaveSettingsSchema = new Schema(
  {
    guildId: { type: String, required: true },
    channelId: { type: String, required: true, unique: true },
    enabled: { type: Boolean, default: true },
    message: { type: String, default: null },
    useEmbed: { type: Boolean, default: false },
    embed: {
      title: { type: String, default: "Goodbye!" },
      description: {
        type: String,
        default: "Goodbye {user}, we hope to see you again!",
      },
      color: { type: String, default: "#FF0000" },
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

export default model("LeaveSettings", leaveSettingsSchema);
