const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Genre = require('../models/genre');

exports.createGenre = function(req, res) { 
    var newuser = new Genre(req.body);
    newuser.save(function (err, user) { 
        if (err) { 
            res.status(400).json(err);
        }

        res.json(genre); 
});
};

exports.getGenre = function(req, res) {
  Genre.find({}, function (err, users) {
    if (err) {
      res.status(400).json(err); 
    } 
    res.json(genre);
  }); 
};




