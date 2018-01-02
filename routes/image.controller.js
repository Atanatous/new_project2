// routes/image.controller.js

// DEFINE MODEL
const Image = require('../models/image');
const fs = require('fs');
const multiparty = require('multiparty');

// GET ALL IMAGE's PATH
exports.show = function(req, res){
    Image.find({}, {_id: 0, filename: 1}, function(err, images) {
        if (err) return res.status(500).json({ error: err });
        res.json(images);
}

// GET SINGLE IMAGE
exports.index = function(req, res){
    Image.findOne({_id: req.params.image_id}, function(err, image){
        if (err) return res.status(500).json({ error: err });
        if (!image) return res.status(404).json({ error: 'Image Not Found' });
        var file = __dirname + "/../public/images" + image.filename;
        res.download(file);
    });
}

// UPLOAD IMAGE
exports.upload = function(req, res) {
    for (var key in req.files) {
        var filename = req.files[key]["filename"];
        var mimetype = req.files[key]["mimetype"];
        var size     = req.files[key]["size"];
        
        Image.findOneAndUpdate(
            { "filename": filename, "mimetype": mimetype },
            { "filename": filename, "mimetype": mimetype, "size": size },
            { upsert : true },
            (err) => { if (err) { console.error(err); res.json({ result: 0 }); return; }});
        }
    res.json({ result: 1 });
}
