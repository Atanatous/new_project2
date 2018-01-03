// routes/member.controller.js

// DEFINE MODEL
const Member = require('../models/member');

// GET USER INFO
exports.member_info = function(req, res) {
    Member.findOne({ username: req.params.username }, { _id: 0, username: 1, commentNum: 1 }, function(err, member) {
            if (err) return res.status(500).send({ error: 'database failure' });
            res.json(member);
        });
}
