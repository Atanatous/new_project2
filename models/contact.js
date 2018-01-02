const mongoose  = require('mongoose');
const fs        = require('fs');
const Schema    = mongoose.Schema;

var contactSchema = new Schema({
    name: String,
    number: String,
    userPhoto: String,
    type: { type: String, default: "PHONE" }
});

module.exports = mongoose.model('contact', contactSchema);
