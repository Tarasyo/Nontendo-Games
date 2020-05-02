var express = require('express');
var router = express.Router();

const genreController = require('../controllers/genre-controllers');



router.get('/', genreController.getGenre);
router.post('/new', genreController.createGenre);
router.get('/:uid', genreController.getGenreById);


module.exports = router;
