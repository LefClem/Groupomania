const express = require("express");
const app = express();
const path = require('path');
require("dotenv").config();
const userRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use("/images", express.static(path.join(__dirname, 'images')))
app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
