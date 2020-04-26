var Game = require('../models/games');

exports.createGame = function(req, res) { 
    var newgame = new Game(req.body);
    newgame.save(function (err, game) { 
        if (err) { 
            res.status(400).json(err);
        }

        res.json(game); 
});
};

exports.getGames = function(req, res) {
  Game.find({}, function (err, games) {
    if (err) {
      res.status(400).json(err); 
    } 
    res.json(games);
  }); 
};

exports.getGame = function(req, res) {
  Game.findOne({_id: req.params.id}, function (err, game) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(game);
  }); 
};

exports.updateGame = function(req, res) {
  Game.findOneAndUpdate({_id: req.params.id}, req.body, {new: true},function (err, game) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(game);
  }); 
};

exports.deleteGame = function(req, res) {
  Game.findByIdAndRemove(req.params.id, function (err, game) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(game);
  }); 
};
