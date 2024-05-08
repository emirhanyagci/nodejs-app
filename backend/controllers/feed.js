const { validationResult } = require("express-validator");
exports.getPosts = (req, res, next) => {
  console.log("yep");
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
  console.log(title);
  res.status(201).json({
    message: "Post succesfully createt",
    post: {
      id: new Date(),
      title,
      content,
      creator: {
        name: "Emirhan",
      },
      createdAt: new Date(),
    },
  });
};
