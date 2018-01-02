// routes/index.js

/////////////////////////////////////////////////////////////////
//                       MODULE IMPORT                         //
/////////////////////////////////////////////////////////////////

const express                = require('express');
const router                 = express.Router();
const contact_controller     = require('./contact.controller');
const book_controller        = require('./book.controller');
const image_controller       = require('./image.controller');

/////////////////////////////////////////////////////////////////
//                   MODULE FOR IMAGE HANDLE                   //
/////////////////////////////////////////////////////////////////

const fs = require('fs');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

// ROUTING CONTROL FOR IMAGE
router.get('/images', image_controller.show);
router.get('/images/:image_id', image_controller.index);
//router.post('/images', image_controller.upload);
router.post('/images', upload.array('img', 10), image_controller.upload);

// ROUTING CONTROL FOR CONTACT
router.get('/contacts', contact_controller.show);
router.get('/contacts/:contact_id', contact_controller.index);
router.get('/contacts/name/:name', contact_controller.find_by_name);
router.post('/contacts', contact_controller.create);
router.put('/contacts/:contact_id', contact_controller.update);
router.delete('/contacts/:contact_id', contact_controller.destroy);

// ROUTING CONTROL FOR BOOK
router.get('/books', book_controller.show);
router.get('/books/:book_id', book_controller.index);
router.get('/books/author/:author', book_controller.find_by_author);
router.post('/books', book_controller.create);
router.put('/books/:book_id', book_controller.update);
router.delete('/books/:book_id', book_controller.destroy);

// EXPORT AS MODULE
module.exports = router;
