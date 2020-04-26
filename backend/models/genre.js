const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const genreSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    games: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Game'}]
});

genreSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Genre', genreSchema);


