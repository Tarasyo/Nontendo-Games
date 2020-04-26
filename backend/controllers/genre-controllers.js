const Genre = require('../models/genre');

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
  Genre.find({}, function (err, genre) {
    if (err) {
      res.status(400).json(err); 
    } 
    res.json(genre);
  }); 
};




