const jwt = require("jsonwebtoken");
const config = require("../config/config");
const userModel = require("../models/user.model");

const authMiddlware = async (req, res, next) => {
  const { token } = req.cookies;
  

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);    
    const user = await userModel.findById(decoded.id).select('-__v');

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = authMiddlware;
