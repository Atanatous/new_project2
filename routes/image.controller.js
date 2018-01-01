// routes/image.controller.js

const fs = require('fs');

// DEFINE MODEL
var Image = require('../models/image');

// GET ALL IMAGES
exports.show = function(req, res){
    Image.find(function(err, images){
        if (err) return res.status(500).send({ error: 'database failure' });
        res.json(images);
    });
};

// GET SINGLE IMAGES
exports.index = function(req, res){
    Image.findOne({_id: req.params.image_id}, function(err, image){
        if (err) return res.status(500).json({ error: err });
        if (!image) return res.status(404).json({ error: 'image not found' });
        res.json(image);
    });
};

// CREATE IMAGE
exports.create = function(req, res){
    var image = new Image();
    image.img.data = fs.readFileSync(req.files);
    image.img.contentType = 'image/png';
    image.save(function(err){
        if (err){
            console.error(err);
            res.json({result: 0});
            return;
        }
        console.log("New Image Created");
        res.send(image.img.data);
    });
};

