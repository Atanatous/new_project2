// ./models/article.js

// IMPORT MODULE
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const Comment   = require('./comment');
const CommentSchema = mongoose.model('Comment').schema

var articleSchema = new Schema({
    title: String,
    content: String,
    image: String,
    score: Number,
    numVoted: Number,
    comments: [CommentSchema]
})

module.exports = mongoose.model('article', articleSchema);
