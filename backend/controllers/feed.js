const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");
const Post = require("../models/post");
const User = require("../models/user");
const user = require("../models/user");
exports.getPosts = (req, res, next) => {
  const { page } = req.params || 1;
  const perPage = 5;

  Post.find()
    .skip((page - 1) * perPage)
    .limit(perPage)
    .populate("creator")
    .then((posts) => {
      res.json({
        posts,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .populate("creator")
    .then((post) => {
      res.status(201).json({
        message: "succsefully fetched single post",
        post,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.getPostCount = (req, res, next) => {
  Post.countDocuments()
    .then((count) => {
      res.json({
        count,
      });
    })
    .catch((err) => {
      next(err);
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
    creator: req.userId,
  });
  post
    .save()
    .then(() => {
      return User.findById(req.userId);
    })
    .then((user) => {
      user.posts.push(post);
      return user.save();
    })
    .then((user) => {
      res.status(201).json({
        message: "Post succesfully createt",
        post: post,
        creator: { _id: user._id, name: user.name },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.updatePost = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const err = new Error("Validation failed,entered data is not valid");
    err.statusCode = 422;
    throw err(err.message);
  }
  const { postId } = req.params;
  const { title, content } = req.body;

  let updatedPost = {
    title,
    content,
  };
  if (req.file) {
    Post.findById(postId).then((post) => {
      clearImage(post.imageUrl);
    });
    updatedPost = { ...updatedPost, imageUrl: req.file.path };
  }
  Post.findByIdAndUpdate(postId, updatedPost, { new: true })
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      console.log(post.creator.toString());
      console.log(req.userId);
      if (post.creator.toString() !== req.userId) {
        const error = new Error("Not authhorized");
        error.statusCode = 403;
        throw error;
      }
      res.status(201).json({
        message: "updated succesfully done",
        post: post,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.deletePost = (req, res, next) => {
  const { postId } = req.params;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      if (post.creator.toString() !== req.userId) {
        const error = new Error("Not authhorized");
        error.statusCode = 403;
        throw error;
      }
      clearImage(post.imageUrl);
      return Post.findByIdAndDelete(postId);
    })
    .then(() => {
      return User.findById(req.userId);
    })
    .then((user) => {
      user.posts.pull(postId);
      user.save();
    })
    .then(() => {
      res.json({ message: "Post deleted" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
