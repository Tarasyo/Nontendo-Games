const Genre = require('../models/genre');

//Req Res handele functions of the genre

exports.createGenre = function(req, res) { 
    var newgenre = new Genre(req.body);
    newgenre.save(function (err, genre) { 
        if (err) { 
            res.status(400).json(err);
        }

        res.json(genre); 
});
};

exports.getGenre = function(req, res) {
  Genre.find({}, function (err, genres) {
    if (err) {
      res.status(400).json(err); 
    } 
    res.json(genres);
  }); 
};

exports.getGenreById = function(req, res) {
  Genre.findOne({_id: req.params.id}, function (err, genre) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(genre);
  }); 
};




