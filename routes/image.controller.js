// routes/image.controller.js

// DEFINE MODEL
const Image = require('../models/image');
const fs = require('fs');
const multiparty = require('multiparty');

// GET ALL IMAGE's PATH
exports.show = function(req, res){
    Image.find({}, { _id: 0, filename: 1 }, function(err, images) {
        if (err) return res.status(500).json({ error: err });
        res.json(images);
    });
}

// GET IMAGE PATH BY NAME
exports.find_by_name = function(req, res){
    Image.findOne({ filename: req.params.filename }, { _id: 0, filename: 1 }, function(err, image){
        if (err) return res.status(500).json({ error: err });
        if (!image) return res.status(404).json({ error: 'Image Not Found' });
        var file = __dirname + "/../public/images/" + image.filename;
        res.download(file);
    });
}

// UPLOAD IMAGE
exports.upload = function(req, res) {
    var filename;
    var mimetype;
    var size;

    for (var key in req.files) {
        filename = req.files[key]["filename"];
        mimetype = req.files[key]["mimetype"];
        size     = req.files[key]["size"];
        
        Image.findOneAndUpdate(
            { "filename": filename, "mimetype": mimetype },
            { "filename": filename, "mimetype": mimetype, "size": size },
            { upsert : true },
            (err) => { if (err) { console.error(err); res.json({ result: 0 }); return; }});
        }
    res.json({ result: 1 });
    console.log("filename: " +filename);
    console.log("mimetype: " +mimetype);
    console.log("Upload Complete");
}
