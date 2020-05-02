var express = require('express'),
router = express.Router();

var gamesControllers = require('../controllers/games-controllers');
var fileUpload = require('../middleware/file-uploud');


router.get('/', gamesControllers.getGames);
router.get('/genre/:uid', gamesControllers.getGameByGenreId);
router.get('/:gid', gamesControllers.getGame);
router.post('/', fileUpload.single('image'), gamesControllers.createGame);
router.patch('/:gid', gamesControllers.updateGame);
router.delete('/:gid', gamesControllers.deleteGame);

module.exports = router;
