import Message from "../models/Message.js";

export const getMessage = async (req, res) => {
  res.send("testing cookies");
  // console.log(req.cookies);
};
