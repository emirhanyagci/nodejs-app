const { body } = require("express-validator");
const User = require("../../models/user");
const validateAuth = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("E-Mail address already exist");
      }
    })
    .normalizeEmail(),
  body("password").trim().isLength({ min: 5 }),
  body("name").trim().not().isEmpty(),
];
module.exports = validateAuth;
