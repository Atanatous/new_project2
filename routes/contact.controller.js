// routes/contact.controller.js

// LOAD MODULE
const fs = require('fs');

// DEFINE MODEL
var Contact = require('../models/contact');


// GET ALL CONTACTS 
exports.show = function(req, res){
    Contact.find(function(err, contacts){
        if (err)
            return res.status(500).send({error: 'database failure'});
            res.json(contacts);
        });
    };

// GET SINGLE CONTACT
exports.index = function(req, res){
    Contact.findOne({_id: req.params.contact_id}, function(err, contact){
        if (err)
           return res.status(500).json({error: err});
        if (!contact)
           return res.status(404).json({error: 'contact not found'});
        res.json(contact);
    });
};

// GET CONTACT BY NAME
exports.find_by_name = function(req, res){
    Contact.find({name: req.params.name}, {_id: 0, name: 1, number: 1, email: 1}, function(err, contact){
        if (err)
            return res.status(500).json({error: err});
        if (!contact)
            return res.status(404).json({error: 'contact not found'});
        res.json(contact);
    });
};
        

// CREATE CONTACT
exports.create = function(req, res){
    var contact = new Contact();
    contact.name = req.body.name;
    contact.number = req.body.number;
    contact.email = req.body.email;
    // contact.picture.data;
    contact.source = req.body.source;
    contact.save(function(err){
        if (err){
            console.error(err);
            res.json({result: 0});
            return;
        }
        console.log("New Contact Created");
        res.json(contact._id);
     });           
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
    Contact.remove({ _id: req.params.contact_id }, function(err, output){
        if (err) return res.status(500).json({ error: "database failure" });
        res.status(204).end();
    });
};

