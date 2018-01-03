// ./models/article.js

// IMPORT MODULE
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

var commentSchema = new Schema({
    username: String,
    message: String,
    score: Number
})

var articleSchema = new Schema({
    title: String,
    description: String,
    image: String,
    score: Number,
    numVoted: Number,
    comments: [commentSchema],
})

module.exports = mongoose.model('article', articleSchema);
