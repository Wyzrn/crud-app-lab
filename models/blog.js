const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  isReadyToPost: Boolean,
  title: String,
  body: String,
});

const Blog = mongoose.model("Blog", blogSchema); // create model

module.exports = Blog;