const Message = require("../models/Message");

exports.getMessage = async (req, res) => {
  res.send("testing cookies");
  // console.log(req.cookies);
};
