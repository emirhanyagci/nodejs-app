const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const app = express();

const feedRoutes = require("./routes/feed");
app.use(bodyParser.json());
app.use((req, res, next) => {
  // normalde baska bir domainden istek atilmaya izin verilmez Access-Control-Allow-Origin bu engeli kaldirir
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PATCH,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});
app.use("/feed", feedRoutes);
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.9thafap.mongodb.net/messages?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log(process.env.MONGODB_USERNAME);

    app.listen(8080);
  })
  .catch((err) => {});
