const express = require("express");
const router = express.Router();
const validateAuth = require("./validators/authValidator");
const { signup, login, reLogin } = require("../controllers/auth");

router.post("/signup", validateAuth, signup);
router.post("/login", login);
router.post("/reLogin", reLogin);
module.exports = router;
