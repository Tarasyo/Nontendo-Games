var express = require('express'),
 bodyParser = require('body-parser'),
 mongoose = require('mongoose'),
 logger = require("morgan");
require('dotenv').config();

const gamesRoutes = require('./routes/games-routes');
const genreRoutes = require('./routes/genre-routes');

const app = express();
var port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/api/games', gamesRoutes);
app.use('/api/genre', genreRoutes);


app.listen(port, function(err){
    console.log("Listening on Port: " + port)
});

mongoose.connect('mongodb+srv://test:ccttestuser@cluster0-wdwhi.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.on('error', (err) => { 
    console.log('Mongodb Error: ', err); 
    process.exit();
});
mongoose.connection.on('connected', () => { 
    console.log('MongoDB is successfully connected');
});

