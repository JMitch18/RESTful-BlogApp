const express = require("express"),
  app = express(),
  bodyParser = require(bodyParser),
  mongoose = require("mongoose");

// Setting up Mongoose
mongoose.connect("mongodb://localhost/restFul_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// title
// image
// body
// created
