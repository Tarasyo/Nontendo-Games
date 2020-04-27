var express = require('express');
var router = express.Router();

const genreController = require('../controllers/genre-controllers');

module.exports.UPLOAD_PATH = 'uploads';

var multer = require('multer');
var upload = multer({ dest: module.exports.UPLOAD_PATH });

router.get('/', genreController.getGenre);
router.post('/genre', genreController.createGenre);
router.get('/:uid', genreController.getGenreById);


module.exports = router;
