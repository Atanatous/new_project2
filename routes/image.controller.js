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
            
            file = fs.readFile(__dirname + "/../images/" + filename,
                    function(err, data){
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
