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
    return res.status(422).json({
      message: "Validation failed,entered data is not valid",
      errors: error.array(),
    });
  }
  const { title, content } = req.body;
  const post = new Post({
    title,
    imageUrl: "images/duck.jpg",
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
      console.log(err);
    });
};
