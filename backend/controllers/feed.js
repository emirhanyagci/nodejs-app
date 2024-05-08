exports.getPosts = (req, res, next) => {
  console.log("yep");
  res.json({
    posts: [
      {
        title: "Hello nodejs",
        content: "Nodejs is most common used backend language",
      },
    ],
  });
};
exports.createPost = (req, res, next) => {
  const { title, content } = req.body;
  res.status(201).json({
    message: "Post succesfully createt",
    post: { id: new Date().toISOString(), title, content },
  });
};
