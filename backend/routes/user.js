const express = require("express");
const isAuth = require("../middleware/isAuth");
const { getStatus, updateStatus } = require("../controllers/user");

const router = express.Router();

router.get("/status", isAuth, getStatus);
router.patch("/update-status", isAuth, updateStatus);

module.exports = router;
