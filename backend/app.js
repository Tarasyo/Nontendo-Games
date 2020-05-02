//The main parts of the backend code was taken from lecture of IWA classes GitHub account https://github.com/mikhail-cct/mongodb-test
//Add customise for my application
const fs = require('fs');
const path = require('path');
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


app.use('/uploads/images', express.static(path.join('uploads', 'images')));


// Cross-origin resource sharing is a mechanism that allows restricted 
// resources on a web page to be requested from another domain outside the 
//domain from which the first resource was served
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/api/games', gamesRoutes);
app.use('/api/genre', genreRoutes);


app.listen(port, function(err){
    console.log("Listening on Port: " + port)
});

mongoose.connect(process.env.MONGODB_URL);
mongoose.connection.on('error', (err) => { 
    console.log('Mongodb Error: ', err); 
    process.exit();
});
mongoose.connection.on('connected', () => { 
    console.log('MongoDB is successfully connected');
});

