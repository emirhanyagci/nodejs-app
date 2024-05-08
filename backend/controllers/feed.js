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
  const { title, content } = req.body;
  res.status(201).json({
    message: "Post succesfully createt",
    post: { id: new Date().toISOString(), title, content },
  });
};
