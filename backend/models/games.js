const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const gameSchema = new Schema({
    name: { type: String, required: true },
    publisher: { type: String, required: true },
    image: { type: String, required: true },
    release: { type: String, required: true },
    director: { type: String, required: true },
    rank: { type: String, required: true },
    genreId: { type: mongoose.Types.ObjectId, required: true, ref: 'Genre'}
});

module.exports = mongoose.model('Game', gameSchema);