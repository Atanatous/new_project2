// routes/image.controller.js

// DEFINE MODEL
const Image = require('../models/image');
const fs = require('fs');
const multiparty = require('multiparty');

// GET ALL IMAGES
exports.show = function(req, res){
    console.log("Ready to Show");
    Image.find(function(err, images){
        if (err) return res.status(500).send({ error: 'database failure' });
        console.log(images);
        var file;
        res.writeHead(200, { 'Content-Type': 'image/png' });
        for (var key in images){
            console.log("Confusing..");
            var filename = images[key]["filename"];
            var mimetype = images[key]["mimetype"];
            var size = images[key]["size"];
            
            file = fs.readFile(__dirname + "/../images/" + filename, function(err, data){
                    if (err) throw err;
            res.write(data);
            });
        }
        res.end();
        console.log("Finish!");
    });
}

// GET SINGLE IMAGE
exports.index = function(req, res){
    Image.findOne({_id: req.params.image_id}, function(err, image){
        if (err) return res.status(500).json({ error: err });
        if (!image) return res.status(404).json({ error: 'Image Not Found' });
        var file = __dirname + "/../images/" + image.filename;
        res.download(file);
    });
}

// UPLOAD IMAGE
exports.upload = function(req, res) {
    console.log(req.files);
    for (var key in req.files) {
        var image = new Image();
        image.filename = req.files[key]["filename"];
        image.mimetype = req.files[key]["mimetype"];
        image.size = req.files[key]["size"];
        image.save(function(err) {
            if (err) {
                console.error(err);
                res.json({ result: 0 });
                return;
            }
        });
    }
    console.log("Image Path Added");
    res.json({ result: 1 });
}
