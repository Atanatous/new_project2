var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pictureSchema = new Schema({
    title: String,
    size: Number,
    filePath: String,
    created_date: Date
});

module.exports = mongoose.model('picture', pictureSchema);
