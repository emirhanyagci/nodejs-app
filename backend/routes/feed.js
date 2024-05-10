const express = require("express");
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/feed");
const validatePost = require("./validators/postValidator");
const router = express.Router();
router.get("/posts", getPosts);
router.get("/post/:postId", getPost);
router.post("/post", validatePost, createPost);
router.patch("/post/edit/:postId", validatePost, updatePost);
router.delete("/post/delete/:postId", deletePost);
module.exports = router;
