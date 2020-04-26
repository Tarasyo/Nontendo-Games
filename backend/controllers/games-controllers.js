const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const Game = require('../models/games');
const Genre = require('../models/genre');

const getgameById = async (req, res, next) => {
  const gameId = req.params.pid;

  let game;
  try {
    game = await game.findById(gameId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a game.',
      500
    );
    return next(error);
  }

  if (!game) {
    const error = new HttpError(
      'Could not find a game for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ game: game.toObject({ getters: true }) });
};

const getgamesBygenreId = async (req, res, next) => {
  const genreId = req.params.uid;

  // let games;
  let genreWithgames;
  try {
    genreWithgames = await genre.findById(genreId).populate('games');
  } catch (err) {
    const error = new HttpError(
      'Fetching games failed, please try again later',
      500
    );
    return next(error);
  }

  // if (!games || games.length === 0) {
  if (!genreWithgames || genreWithgames.games.length === 0) {
    return next(
      new HttpError('Could not find games for the provided genre id.', 404)
    );
  }

  res.json({
    games: genreWithgames.games.map(game =>
      game.toObject({ getters: true })
    )
  });
};

const creategame = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdgame = new game({
    title,
    description,
    address,
    location: coordinates,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg',
    creator
  });

  let genre;
  try {
    genre = await genre.findById(creator);
  } catch (err) {
    const error = new HttpError('Creating game failed, please try again', 500);
    return next(error);
  }

  if (!genre) {
    const error = new HttpError('Could not find genre for provided id', 404);
    return next(error);
  }

  console.log(genre);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdgame.save({ session: sess });
    genre.games.push(createdgame);
    await genre.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating game failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ game: createdgame });
};

const updategame = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, description } = req.body;
  const gameId = req.params.pid;

  let game;
  try {
    game = await game.findById(gameId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update game.',
      500
    );
    return next(error);
  }

  game.title = title;
  game.description = description;

  try {
    await game.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update game.',
      500
    );
    return next(error);
  }

  res.status(200).json({ game: game.toObject({ getters: true }) });
};

const deletegame = async (req, res, next) => {
  const gameId = req.params.pid;

  let game;
  try {
    game = await game.findById(gameId).populate('creator');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete game.',
      500
    );
    return next(error);
  }

  if (!game) {
    const error = new HttpError('Could not find game for this id.', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await game.remove({ session: sess });
    game.creator.games.pull(game);
    await game.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete game.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted game.' });
};

exports.getgameById = getgameById;
exports.getgamesBygenreId = getgamesBygenreId;
exports.creategame = creategame;
exports.updategame = updategame;
exports.deletegame = deletegame;
