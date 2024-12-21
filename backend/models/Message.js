const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    content: String,
    user: String,
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = model("Message", messageSchema);
