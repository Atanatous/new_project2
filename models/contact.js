// ./models/contact.js

// LOAD MODULE
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

var contactSchema = new Schema({
    name: String,
    number: String,
    userPhoto: String,
    type: { type: String, default: "PHONE" }
});

module.exports = mongoose.model('contact', contactSchema);
