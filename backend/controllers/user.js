const User = require("../models/user");
exports.getStatus = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      res.json({
        status: user.status,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.updateStatus = (req, res, next) => {
  const { status } = req.body;
  console.log(status);
  User.findByIdAndUpdate(req.userId, {
    status,
  })
    .then((user) => {
      res.json({
        message: "status succesfully updated",
        status,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
