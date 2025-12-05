const jwt = require("jsonwebtoken");
const config = require("../config/config");
const userModel = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  // Try to get token from Authorization header first, then from cookies
  let token = null;
  
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

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

module.exports = authMiddleware;
