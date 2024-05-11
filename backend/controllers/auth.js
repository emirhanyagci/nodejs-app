const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
exports.signup = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = err.array();
    throw error;
  }
  const { email, name, password } = req.body;

  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email,
        password: hashedPw,
        name,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "user succesfully created",
        userId: result._id,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
