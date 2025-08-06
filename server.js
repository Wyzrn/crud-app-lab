// Here is where we import modules
// We begin by loading Express
const express = require('express');
const dotenv = require("dotenv"); // require package
const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new
const mongoose = require("mongoose");
dotenv.config(); // Loads the environment variables from .env file
const app = express();



mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Blog = require("./models/blog.js");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new
// server.js

// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.get("/blogs/new", (req, res) => { //blogs new route
  res.render("blogs/new.ejs");
});


// POST /fruits
app.post("/blogs", async (req, res) => {
  if (req.body.isReadyToPost === "on") {
    req.body.isReadyToPost = true;
  } else {
    req.body.isReadyToPost = false;
  }
    console.log(req.body);
  await Blog.create(req.body);
  res.redirect("/blogs");
});

app.get("/blogs", async (req, res) => {
  const allBlogs = await Blog.find();
  console.log(allBlogs);
  res.render("blogs/index.ejs", { blogs: allBlogs });
});

app.get("/blogs/:blogId", async (req, res) => {
    const foundBlog = await Blog.findById(req.params.blogId);
    res.render("blogs/show.ejs", { blog: foundBlog });
});

app.delete("/blogs/:blogId", async (req, res) => {
    await Blog.findByIdAndDelete(req.params.blogId);
    res.redirect("/blogs");
});

app.get("/blogs/:blogId/edit", async (req, res) => {
  const foundBlog = await Blog.findById(req.params.blogId);
  console.log(foundBlog);
  res.render("blogs/edit.ejs", {
    blog: foundBlog,
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
