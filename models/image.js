// models/image.js

// LOAD MODULES
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// BUILD NEW MODEL
var imageSchema = new Schema({
    filename: String,
    mimetype: String,
    size: Number
});

module.exports = mongoose.model('image', imageSchema);
