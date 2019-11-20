const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: "Input Title Please"
  },
  content: {
    type: String,
    required: "Input contents please"
  }
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
