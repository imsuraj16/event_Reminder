const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
} = require("../controllers/auth.controller");
const {
  registerValidator,
  loginValidator,
} = require("../middlewares/validators/auth.validator");
const authMiddlware = require("../middlewares/auth.middleware");
const router = express.Router();

//register
router.post("/register", registerValidator, registerUser);

//login
router.post("/login", loginValidator, loginUser);

//profile
router.get("/profile", authMiddlware, getProfile);

//logout
router.post("/logout", logoutUser);

module.exports = router;
