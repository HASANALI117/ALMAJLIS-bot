import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    content: String,
    user: String,
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default model("Message", messageSchema);
