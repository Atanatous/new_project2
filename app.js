// app.js

// [LOAD PACKAGES]
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var session        = require('express-session');
var crypto         = require('crypto');
var Member         = require('./models/member');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ limit: '50mb',  extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 8080;

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

// [ABOUT LOGIN ]
var myHash = function myHash(key) {
    var hash = crypto.createHash('sha1');
    hash.update(key);
    return hash.digest('hex');
}

app.post('/login', function (req, res, next) {
    req.username = req.body.username;
    req.password = myHash(req.body.password);  
    next();
    }, function (req, res) {
    Member.findOne({ username: req.username, password: req.password }, (err, member) => {
            if (member != null) {
                res.json({ "result": 1 });
            } else {
                res.json({ "result": 0 });
            }
      });
});

app.post('/sign_up', function (req, res) {
    req.username = req.body.username;
    req.password = myHash(req.body.password);
    Member.findOneAndUpdate(
            { "username": req.username }, 
            { "username" : req.username, "password" : req.password },
            { "upsert" : 1 },
            (err) => { if (err) { console.error(err); res.json({ "result": 0 }); return;}
                       else { res.json({ "type": "commit", "result": 1 }) }});
    });

app.post('/sign_up_check', function (req, res) {
    req.username = req.body.username;
    Member.findOne({ username: req.username }, (err, member) => {
            if (member != null) {
                res.json({ "type": "check", "result": 0 });
            } else {
                res.json({ "type": "check", "result": 1 });
            }
        });
    });

// [RUN SERVER]
var server = app.listen(port, function(){   
    console.log("Express server has started on ip 13.125.74.215 port " + port)
});
