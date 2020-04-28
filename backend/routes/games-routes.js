var express = require('express'),
router = express.Router();

var gamesControllers = require('../controllers/games-controllers');

module.exports.UPLOAD_PATH = 'uploads';

var multer = require('multer');
var upload = multer({ dest: module.exports.UPLOAD_PATH });

router.get('/', gamesControllers.getGames);
router.get('/genre/:uid', gamesControllers.getGameByGenreId);
router.get('/:gid', gamesControllers.getGame);
router.post('/', gamesControllers.createGame);
router.patch('/:gid', gamesControllers.updateGame);
router.delete('/:gid', gamesControllers.deleteGame);

module.exports = router;
