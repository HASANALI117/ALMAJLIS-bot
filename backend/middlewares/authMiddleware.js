const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);

    // Fetch user from the database
    const user = await User.findOne({ userID: decodedToken.userID });
    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    req.user = user;

    console.log(req.user);
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
};

module.exports = authenticateToken;
