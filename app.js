const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");
methodOverride = require("method-override");
expressSanitizer = require("express-sanitizer");

// App configuration
mongoose.connect(
  "mongodb://jay:5wsy20@ds237723.mlab.com:37723/restful-blogapp",
  { useNewUrlParser: true }
);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

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

// INDEX ROUTE
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/blogs", (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log("Something went wrong!");
    } else {
      res.render("index.ejs", { blogs: blogs });
    }
  });
});

// NEW ROUTE
app.get("/blogs/new", (req, res) => {
  res.render("new.ejs");
});

// CREATE ROUTE
app.post("/blogs", (req, res) => {
  //creating the blog

  //sanitize
  req.body.blog.body = req.sanitize();

  Blog.create(req.body.blog, (err, newBlog) => {
    if (err) {
      res.render("new");
    } else {
      //then, redirect to the index
      res.redirect("/blogs");
    }
  });
});

// SHOW ROUTE
app.get("/blogs/:id", (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("show", { blog: foundBlog });
    }
  });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("edit", { blog: foundBlog });
    }
  });
});

// UPDATE ROUTE
app.put("/blogs/:id", (req, res) => {
  //sanitize
  req.body.blog.body = req.sanitize();
  //Blog.findByIdAndUpdate(id, newData, callback)
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs/" + req.params.id); //redirect to that id
    }
  });
});

// DELETE ROUTE
app.delete("/blogs/:id", (req, res) => {
  //destroy blog
  //Blog.findByIdAndRemove(req.params.id, function(err))
  Blog.findByIdAndRemove(req.params.id, err => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs");
    }
  });
  //redirect somewhere
});

// Port
app.listen(process.env.PORT || 8080);
