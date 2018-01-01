const mongoose  = require('mongoose');
const fs        = require('fs');
const Schema    = mongoose.Schema;

var contactSchema = new Schema({
    name: String,
    number: String,
    email: String,
//    picture: { data: {type: Buffer, default: fs.readFile(__dirname + "/../images/facebook.png") },  ContentType: String },
    source: { type: String, default: "Phone" }
});

module.exports = mongoose.model('contact', contactSchema);
