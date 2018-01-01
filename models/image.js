// models/image.js

// LOAD MODULES
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var multer = require('multer');

// PATH WHERE IMAGE UPLOADED
var upload = multer({ dest: './images'});

// BUILD NEW MODEL
var imageSchema = new Schema({
    img: { data: Buffer, contentType: String }
});

module.exports = mongoose.model('image', imageSchema);
