const express = require('express');
const { check } = require('express-validator');

const genreController = require('../controllers/genre-controllers');

const router = express.Router();

router.get('/', genreController.getGenre);
router.post('/genre', genreController.createGenre);


module.exports = router;
