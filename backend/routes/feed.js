const express = require("express");
const { getPosts, createPost } = require("../controllers/feed");
const validatePost = require("./validators/postValidator");
const router = express.Router();
router.get("/posts", getPosts);
router.post("/post", validatePost, createPost);
module.exports = router;
