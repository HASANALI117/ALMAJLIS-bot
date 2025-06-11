import { Schema, SchemaTypes, model } from "mongoose";

export interface User {
  id: string;
  discordId: string;
  accessToken: string;
  refreshToken: string;
}

const userSchema = new Schema<User>(
  {
    discordId: { type: SchemaTypes.String, required: true, unique: true },
    accessToken: { type: SchemaTypes.String, required: true },
    refreshToken: { type: SchemaTypes.String, required: true },
  },
  { timestamps: true }
);

export default model("User", userSchema);
