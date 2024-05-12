const express = require("express");
const router = express.Router();
const validateAuth = require("./validators/authValidator");
const { signup, login } = require("../controllers/auth");

router.post("/signup", validateAuth, signup);
router.post("/login", login);
module.exports = router;
