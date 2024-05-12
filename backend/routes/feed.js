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
const isAuth = require("../middleware/isAuth");
const router = express.Router();
router.get("/posts/:page", isAuth, getPosts);
router.get("/post/count", isAuth, getPostCount);
router.get("/post/:postId", isAuth, getPost);
router.post("/post", isAuth, validatePost, createPost);
router.patch("/post/edit/:postId", isAuth, validatePost, updatePost);
router.delete("/post/delete/:postId", isAuth, deletePost);

module.exports = router;
