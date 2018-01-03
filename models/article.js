// ./models/article.js

// IMPORT MODULE
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

var articleSchema = new Schema({
    title: String,
    content: String,
    image: String,
    score: Number,
    comments : Schema.ObjectId
})

module.exports = mongoose.model('article', articleSchema);
