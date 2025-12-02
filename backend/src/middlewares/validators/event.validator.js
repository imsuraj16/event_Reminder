const { validationResult, body} = require("express-validator");
const eventModel = require("../../models/event.model");



const errorResponse = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}



const eventValidator = [

     body("title")
    .trim()
    .notEmpty().withMessage("Title is required")
    .isLength({ min: 3, max: 120 }).withMessage("Title must be 3-120 characters"),

    body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage("Description max 1000 characters"),

     body("startTime")
    .notEmpty().withMessage("startTime is required")
    .isISO8601().withMessage("startTime must be a valid ISO8601 date")
    .toDate(),

     body("endTime")
    .optional()
    .isISO8601().withMessage("endTime must be a valid ISO8601 date")
    .toDate()
    .custom((value, { req }) => {
      if (!value) return true;
      if (!req.body.startTime) return true;
      const start = new Date(req.body.startTime);
      if (value <= start) {
        throw new Error("endTime must be later than startTime");
      }
      return true;
    }),

  body("remindBeforeMinutes")
    .optional()
    .isInt({ min: 0, max: 7 * 24 * 60 })
    .withMessage("remindBeforeMinutes must be between 0 and 10080")
    .toInt(),

  body("status")
    .optional()
    .isString().withMessage("Status must be a string")
    .customSanitizer((value) => value.toUpperCase())
    .isIn(["UPCOMING", "COMPLETED", "CANCELLED"])
    .withMessage("status must be one of: UPCOMING, COMPLETED, CANCELLED"),
    
    errorResponse,
];


const updateEventValidator = [

  body("title")
    .optional()
    .trim()
    .notEmpty().withMessage("Title cannot be empty")
    .isLength({ min: 3, max: 120 }).withMessage("Title must be 3-120 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage("Description max 1000 characters"),

  body("startTime")
    .optional()
    .isISO8601().withMessage("startTime must be a valid ISO8601 date")
    .toDate(),

  body("endTime")
    .optional()
    .isISO8601().withMessage("endTime must be a valid ISO8601 date")
    .toDate()
    .custom(async (value, { req }) => {
      if (!value) return true;

      let startTime;
      if (req.body.startTime) {
        startTime = new Date(req.body.startTime);
      } else {
        try {
          const event = await eventModel.findById(req.params.eventId);
          if (!event) return true;
          startTime = event.startTime;
        } catch (error) {
          return true;
        }
      }

      if (startTime && value <= startTime) {
        throw new Error("endTime must be later than startTime");
      }
      return true;
    }),

  body("remindBeforeMinutes")
    .optional()
    .isInt({ min: 0, max: 7 * 24 * 60 })
    .withMessage("remindBeforeMinutes must be between 0 and 10080")
    .toInt(),

  body("status")
    .optional()
    .isString().withMessage("Status must be a string")
    .customSanitizer((value) => value.toUpperCase())
    .isIn(["UPCOMING", "COMPLETED", "CANCELLED"])
    .withMessage("status must be one of: UPCOMING, COMPLETED, CANCELLED"),
    
    errorResponse,

]


module.exports = {
    eventValidator,
    updateEventValidator,
};