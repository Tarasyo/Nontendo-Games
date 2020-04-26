const express = require('express');
const { check } = require('express-validator');

const gamesControllers = require('../controllers/games-controllers');

const router = express.Router();

router.get('/:gid', gamesControllers.getGameById);

router.get('/genre/:uid', gamesControllers.getGamesByGenreId);

router.post('/', gamesControllers.createGame);

router.patch('/:gid', gamesControllers.updateGame);

router.delete('/:gid', gamesControllers.deleteGame);

module.exports = router;
