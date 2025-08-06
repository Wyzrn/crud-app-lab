// Here is where we import modules
// We begin by loading Express
const express = require('express');
const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const app = express();
const mongoose = require("mongoose");


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Blog = require("./models/blog.js");
app.use(express.urlencoded({ extended: false }));
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

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
