// routes/article.controller.js

// DEFINE MODEL
const Article = require('../models/article');
const Comment = require('../models/comment');

// GET ARTICLE BY NAME
exports.show = function(req, res) {
    Article.find({ title: req.params.title }, { _id: 0, title: 1, score: 1, numVoted: 1, comments: 1 }, function(err, article) {
            if (err) return res.status(500).json({ error: err });
            if (!article) return res.status(404).json({ error: 'movie not found' });
            res.json(article);
        });
}

// POST COMMENT IN ARTICLE
exports.add_comment = function(req, res) {
    Article.find({ title: req.body.title }, function(err, article) {
        if (err) return res.status(500).json({ error: err });
        if (!article) return res.status(404).json({ error: 'movie not found' });
        
        comment = new Comment();
        comment.username = req.body.username;
        comment.message = req.body.message;

        comment.save(function(err) {
                if (err) { console.error(err); res.json({ result: 0 }); return; }
                res.json({ result: 1 });
            });
       
        article.comment.insert(comment);
        });
}
