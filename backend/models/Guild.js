const { Schema, model } = require("mongoose");

const guildSchema = new Schema(
  {
    guildID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    iconHash: { type: String, default: null },
    openTicketsCategoryID: { type: String, default: null },
    closedTicketsCategoryID: { type: String, default: null },
    transcriptChannelID: { type: String, default: null },
    modRoleIDs: { type: [String], default: [] },
    pingRoleIDs: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = model("Guild", guildSchema);
