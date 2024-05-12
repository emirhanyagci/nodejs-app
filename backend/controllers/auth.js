const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
exports.login = (req, res, next) => {
  const { email, password } = req.body;

  let fetchedUser;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        const error = new Error(
          "A user with this email adress could not found."
        );
        error.statusCode = 401;
        throw error;
      }
      fetchedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password");
        error.statusCode = 401;
        throw error;
      }

      //sign function create a new signature and pack into new json web token
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id.toString(),
        },
        "secret",
        {
          expiresIn: "3h",
        }
      );

      res.json({
        token,
        user: { _id: fetchedUser._id.toString(), name: fetchedUser.name },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
// check user is login
exports.reLogin = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];

  console.log(token);
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secret");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }
  console.log(decodedToken);
  res
    .status(201)
    .json({ message: "User succesfully authed", userId: decodedToken.userId });
};
