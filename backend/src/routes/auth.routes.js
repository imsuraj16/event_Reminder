const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controller");
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



module.exports = router;
