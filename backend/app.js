const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const feedRoutes = require("./routes/feed");
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use((req, res, next) => {
  // normalde baska bir domainden istek atilmaya izin verilmez Access-Control-Allow-Origin bu engeli kaldirir
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PATCH,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use(multer({ storage, fileFilter }).single("image"));
app.use("/feed", feedRoutes);
app.use((error, req, res, next) => {
  const statusCode = error.statusCode;
  const message = error.message;
  console.log(11, error);
  res.status(statusCode).json({ message });
});
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.9thafap.mongodb.net/messages?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log(process.env.MONGODB_USERNAME);

    app.listen(8080);
  })
  .catch((err) => {});
