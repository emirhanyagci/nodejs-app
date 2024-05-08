const { validationResult } = require("express-validator");
const Post = require("../models/post");
exports.getPosts = (req, res, next) => {
  res.json({
    posts: [
      {
        _id: "1",
        title: "Hello nodejs",
        content: "Nodejs is most common used backend language",
        imageUrl: "images/duck.jpg",
        creator: {
          name: "Emirhan",
        },
        createdAt: new Date(),
      },
    ],
  });
};
exports.createPost = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.log(error);
    const err = new Error("Validation failed,entered data is not valid");
    err.statusCode = 422;
    throw err;
  }

  if (!req.file) {
    const error = new Error("No image provided");
    error.statusCode = 422;
    throw error;
  }
  const { title, content } = req.body;
  const imageUrl = req.file.path;
  console.log(req.file);
  const post = new Post({
    title,
    imageUrl,
    content,
    creator: {
      name: "Emirhan",
    },
  });
  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Post succesfully createt",
        post: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
