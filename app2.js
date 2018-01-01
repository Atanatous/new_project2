// app.js

// [LOAD PACKAGES]
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true  }));
app.use(bodyParser.json());

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 1234;

// [CONFIGURE mongoose]

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
        // CONNECTED TO MONGODB SERVER
        console.log("Connected to mongod server");
        });
mongoose.connect('mongodb://localhost/test');
// DEFINE MODEL
var Book = require('./models/book');


// [CONFIGURE ROUTER]
var router = require('./routes2')(app, Book);


// [RUN SERVER]
var server = app.listen(port, function(){
        console.log("Express server has started on ip 13.125.74.215 port " + port)
        });