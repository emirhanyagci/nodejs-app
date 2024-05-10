const express = require("express");
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getPostCount,
} = require("../controllers/feed");
const validatePost = require("./validators/postValidator");
const router = express.Router();
router.get("/posts/:page", getPosts);
router.get("/post/count", getPostCount);
router.get("/post/:postId", getPost);
router.post("/post", validatePost, createPost);
router.patch("/post/edit/:postId", validatePost, updatePost);
router.delete("/post/delete/:postId", deletePost);
module.exports = router;
