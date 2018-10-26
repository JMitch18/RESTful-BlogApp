const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

// App configuration
mongoose.connect(
  "mongodb://localhost/restFul_blog_app",
  { useNewUrlParser: true }
);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Moongoose configuration
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

// Blog model configuration
const Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES
app.get("/blogs", (req, res) => {
  res.render("index.ejs");
});

//Port
app.listen(3000, () => {
  console.log("Listening on port 3000....");
});
