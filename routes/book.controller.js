// routes/book.controller.js

// DEFINE MODEL
var Book = require('../models/book');

// GET ALL BOOKS
exports.show = function(req, res){
    Book.find(function(err, books){
        if (err)
            return res.status(500).send({error: 'database failure'});
            res.json(books);
        });
    };

// GET SINGLE BOOK
exports.index = function(req, res){
    Book.findOne({_id: req.params.book_id}, function(err, book){
        if (err)
           return res.status(500).json({error: err});
        if (!book)
           return res.status(404).json({error: 'book not found'});
        res.json(book);
    });
};

// GET BOOK BY AUTHOR
exports.find_by_author = function(req, res){
    Book.find({author: req.params.author}, {_id: 0, title: 1, published_date: 1}, function(err, book){
        if (err)
            return res.status(500).json({error: err});
        if (!book)
            return res.status(404).json({error: 'book not found'});
        res.json(book);
    });
};
        
// CREATE BOOK
exports.create = function(req, res){
    var book = new Book();
    book.title = req.body.title;
    book.author = req.body.author;
    book.published_date = new Date(req.body.published_date);
    book.save(function(err){
        if (err){
            console.error(err);
            res.json({result: 0});
            return;
        }
        console.log("New book created.");
        res.json({result: 1});
     });           
};

// UPDATE THE BOOK
exports.update = function(req, res){
    Book.findById(req.params.book_id, function(err, book){
        if (err) return res.status(500).json({ error: 'database failure'});
        if (!book) return res.status(404).json({ error: 'book not found' });

        if (req.body.title) book.title = req.body.title;
        if (req.body.author) book.author = req.body.author;
        if (req.body.published_date) book.published_date = req.body.published_date;

        book.save(function(err){
            if (err) res.status(500).json({error: 'failed to update'});
            res.json({message: 'book updated'});
        });
    });
};

// DELETE BOOK
exports.destroy = function(req, res){
    Book.remove({ _id: req.params.book_id }, function(err, output){
        if (err) return res.status(500).json({ error: "database failure" });
        res.status(204).end();
    });
};

