// routes/contact.controller.js

// DEFINE MODEL
const Contact = require('../models/contact');

// GET ALL CONTACTS 
exports.show = function(req, res){
    Contact.find({}, { _id: 0, name: 1, number: 1, userPhoto: 1, type: 1 }, function(err, contacts){
        if (err) return res.status(500).send({ error: 'database failure' });
        res.json(contacts);
    });
};

// GET CONTACTS BY TYPE
exports.find_by_type = function(req, res){
    Contact.find({type: req.params.type}, { _id: 0, name: 1, number: 1, userPhoto: 1 }, function(err, contacts){
        if (err) return res.status(500).json({ error: err });
        if (!contacts) return res.status(404).json({ error: 'contact not found' });
        res.json(contacts);
    });
};

// GET CONTACTS BY NAME
exports.find_by_name = function(req, res){
    Contact.find({name: req.params.name}, { _id: 0, name: 1, number: 1, userPhoto: 1, type: 1 }, function(err, contacts){
        if (err) return res.status(500).json({ error: err });
        if (!contacts) return res.status(404).json({ error: 'contact not found' });
        res.json(contacts);
    });
};
      
// CREATE CONTACT
exports.create = function(req, res){
    if (Array.isArray(req.body)) {    
        for (var key in req.body){    
            var name    = req.body[key]["name"];
            var number  = req.body[key]["number"];
            var type    = req.body[key]["type"];
            var userPhoto = req.body[key]["userPhoto"];

            Contact.findOneAndUpdate(
                { "name": name, "number": number, "type": type },
                { "name": name, "number": number, "type": type , "userPhoto": userPhoto},
                { upsert : true },
                (err) => {if (err) { console.error(err); res.json({ result: 0 }); return; }});
        }
        
    console.log("Input New JSON Array");
    res.send("Finish to put every contact in DB.");        
    }    
    else if (typeof(req.body) === 'object'){   
        var name    = req.body.name
        var number  = req.body.number
        var type    = req.body.type
        
        Contact.findOneAndUpdate(
            { "name": name, "number": number, "type": type },
            { "name": name, "number": number, "type": type },
            { upsert : true },
            (err) => {if (err) { console.error(err); res.json({ result: 0 }); return; }});
         
        res.send("Finish to put one contact in DB.");
        console.log("Input New JSON Object");
    }
    else {
        console.error("Bad Request Come");
        res.json({ result: 0 });
    }
};

// UPDATE THE CONTACT
exports.update = function(req, res){
    Contact.findById(req.params.contact_id, function(err, contact){
        if (err) return res.status(500).json({ error: 'database failure'});
        if (!contact) return res.status(404).json({ error: 'contact not found' });

        if (req.body.name) contact.name = req.body.name;
        if (req.body.number) contact.number = req.body.number;
        if (req.body.email) contact.email = req.body.email;

        contact.save(function(err){
            if (err) res.status(500).json({error: 'failed to update'});
            res.json({message: 'contact updated'});
        });
    });
};

// DELETE CONTACT
exports.destroy = function(req, res){
    Contact.remove({}, function(err, output){
        if (err) return res.status(500).json({ error: "database failure" });
        res.status(204).end();
    });
};

