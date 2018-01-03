// models/member.js

// LOAD MODULES
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// BUILD NEW MODEL
var memberSchema = new Schema({
    username: String,
    password: String,
    commentNum: Number
});

module.exports = mongoose.model('member', memberSchema);
