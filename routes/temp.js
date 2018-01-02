function(req, res, next) {
    var form = new multiparty.Form();

    form.on('field', function(name, value) {
        console.log('normal field / name = ' +name+ ', value = ' +value);
    });

    form.on('part' , function(part) {
        var filename;
        var size;
        if (part.filename) {
            filename = part.filename;
            size = part.byteCount;
        } else {
            part.resume();
        }
        
        var image = new Image();
        image.filename = filename;
        //image.mimetype = req.files[key]["mimetype"];
        image.size = size;
        image.save(function(err) {
            if (err) {
                console.error(err);
                res.json({ result: 0 });
                return;
            }
        });

        console.log("Write Streaming file :" +filename);
        var writeStream = fs.createWriteStream('./images/' + filename);
        writeStream.filename = filename;
        part.pipe(writeStream);

        part.on('end', function() {
            writeStream.end();
        });
    });

    form.on('close', function() {
        res.status(200).send('Upload complete');
    });

    form.parse(req);

}
