const { body, validationResult, oneOf } = require("express-validator");

const handleError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

const registerValidator = [
  body("fullName")
    .isObject()
    .withMessage("Full name must be an object with firstName and lastName"),

  body("fullName.firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isString()
    .withMessage("First name must be a string"),

  body("fullName.lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isString()
    .withMessage("Last name must be a string"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
    ),

  body("userName").trim().notEmpty().withMessage("User name is required"),

  handleError,
];

const loginValidator = [
  oneOf(
    [
      body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Invalid email format")
        .normalizeEmail(),

      body("userName").trim().notEmpty().withMessage("User name is required"),
    ],
    "Either email or username must be provided"
  ),

  body("password").trim().notEmpty().withMessage("Password is required"),

  handleError,
];

module.exports = { registerValidator, loginValidator };
