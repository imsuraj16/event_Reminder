const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const registerUser = async (req, res) => {
  try {
    const {
      fullName: { firstName, lastName },
      email,
      password,
      userName,
    } = req.body;

    const userExists = await userModel.findOne({
      $or: [{ email }, { userName }],
    });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await userModel.create({
      fullName: { firstName, lastName },
      email,
      password: await bcrypt.hash(password, 10),
      userName,
    });

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        userName: user.userName,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//login User
const loginUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const userExists = await userModel.findOne({
      $or: [{ email }, { userName }],
    }).select("+password");

    if (!userExists) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      userExists.password
    );
    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: userExists._id }, config.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: userExists._id,
        fullName: userExists.fullName,
        email: userExists.email,
        userName: userExists.userName,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
