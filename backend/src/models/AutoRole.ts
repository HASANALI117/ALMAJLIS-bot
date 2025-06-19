import { Schema, model } from "mongoose";

const autoRoleSchema = new Schema(
  {
    guildId: { type: String, required: true, unique: true },
    roleId: { type: String, required: true },
    enabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model("AutoRole", autoRoleSchema);
