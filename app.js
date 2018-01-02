// app.js

// [LOAD PACKAGES]
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var session        = require('express-session');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ limit: '50mb',  extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

// [CONFIGURE SERVER PORT]
var port = 8080;

// [CONFIGURE mongoose]
var db = mongoose.connection;
db.on('error', console.error);

db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});
mongoose.connect('mongodb://localhost/test');

// [CONFIGURE ROUTER]
app.use('/api', require('./routes'));
app.use(express.static(__dirname + '/public'));

// [CONFIGURE express-session]
app.use(session({
    secret: '@#@$MYSIGN@$#$',
    resave: false,
    saveUnitialized: true
}));

app.get('/login', function(req, res){
    sess = req.session;
    sess.username = "wish"
});

app.get('/', function(req, res){
    sess = req.session;
    console.log(sess.username);
});


// [RUN SERVER]
var server = app.listen(port, function(){   
    console.log("Express server has started on ip 13.125.74.215 port " + port)
});
