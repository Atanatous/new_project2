// ./models/comment.js

// LOAD MODULE
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

var commetSchema = new Schema({
    username: String,
    message: String
});

module.exports = mongoose.model('comment', contactSchema);
