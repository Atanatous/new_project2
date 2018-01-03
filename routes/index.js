// routes/index.js

/////////////////////////////////////////////////////////////////
//                       MODULE IMPORT                         //
/////////////////////////////////////////////////////////////////

const express               = require('express');
const router                = express.Router();
const contact_controller    = require('./contact.controller');
const book_controller       = require('./book.controller');
const image_controller      = require('./image.controller');
const article_controller    = require('./article.controller');
const member_controller     = require('./member.controller');

/////////////////////////////////////////////////////////////////
//                   MODULE FOR IMAGE HANDLE                   //
/////////////////////////////////////////////////////////////////

const fs = require('fs');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

// ROUTING CONTROL FOR USER
router.get('/:username', member_controller.member_info);

// ROUTING CONTROL FOR ARTICLE
router.get('/articles/:title', article_controller.show);
router.post('/articles', article_controller.add_comment);

// ROUTING CONTROL FOR IMAGE
router.get('/images', image_controller.show);
router.get('/images/:filename', image_controller.find_by_name);
router.post('/images', upload.array('img', 10), image_controller.upload);

// ROUTING CONTROL FOR CONTACT
router.get('/contacts', contact_controller.show);
router.get('/contacts/type/:type', contact_controller.find_by_type);
router.get('/contacts/name/:name', contact_controller.find_by_name);
router.post('/contacts', contact_controller.create);
router.put('/contacts/:contact_id', contact_controller.update);
router.delete('/contacts', contact_controller.destroy);

// ROUTING CONTROL FOR BOOK
router.get('/books', book_controller.show);
router.get('/books/:book_id', book_controller.index);
router.get('/books/author/:author', book_controller.find_by_author);
router.post('/books', book_controller.create);
router.put('/books/:book_id', book_controller.update);
router.delete('/books/:book_id', book_controller.destroy);

// EXPORT AS MODULE
module.exports = router;
