const express = require("express");
const router = express.Router();
const validateAuth = require("./validators/authValidator");
const { signup } = require("../controllers/auth");

router.post("/signup", validateAuth, signup);
module.exports = router;
