// ./models/comment.js

// LOAD MODULE
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

var commentSchema = new Schema({
    username: String,
    message: String,
    score: Number
});

module.exports = mongoose.model('comment', commentSchema);
