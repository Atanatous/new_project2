var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: String,
    author: String,
    published_date: { type: Date, default: Date.now }
});

// DEFINE MODEL
var Book = mongoose.model('book', bookSchema);

module.exports = mongoose.model('book', bookSchema);

