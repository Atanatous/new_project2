// routes/article.controller.js

// DEFINE MODEL
const Article   = require('../models/article');
const Comment   = require('../models/comment');
const Member    = require('../models/member');

// GET ARTICLE BY NAME
exports.show = function(req, res) {
    Article.find({ title: req.params.title }, { _id: 0, title: 1, description: 1,  score: 1, numVoted: 1, comments: 1 }, function(err, article) {
            if (err) return res.status(500).json({ error: err });
            if (!article) return res.status(404).json({ error: 'movie not found' });
            res.json(article);
        });
}

// POST COMMENT IN ARTICLE
exports.add_comment = function(req, res) {
    Article.findOne({ title: req.body.title }, function(err, article) {
        if (err) return res.status(500).json({ error: err });
        if (!article) return res.status(404).json({ error: 'movie not found' });
        
        comment = new Comment();
        comment.username = req.body.username;
        comment.message = req.body.message;
        comment.score = req.body.score;

        article.comments.push(comment);
        article.score = (article.numVoted * article.score + req.body.score) / (article.numVoted + 1);       
        article.numVoted = article.numVoted + 1;
        
        Member.findOne({ username: req.body.username }, function(err, member) {
                if (err) return res.status(500).json({ error: err });
                if (!member) return res.status(404).json({ error: 'user not found' });
                member.commentNum = member.commentNum + 1;
                member.save((err) => {});
                });

        article.save(function (err) {
            if (!err) res.json(article);
        });
    });
}

