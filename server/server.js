var express = require('express'),
  app = express(),
  port = process.env.PORT || 5000,
  mongoose = require('mongoose'),
  Expenses = require('./api/models/model'), //created model loading here
  bodyParser = require('body-parser'),
  winston = require('winston'),
  expressWinston = require('express-winston'),
  cors = require('cors'),
  path = require('path');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/expenses'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// logging middleware
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: false,
      colorize: true,
      timestamp: true
    }),
    new winston.transports.File({ 
      filename: 'expenses.log' 
    })
  ],
  meta: false, // log the meta data about the request
  expressFormat: true, // default message format
}));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

var routes = require('./api/routes/routes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('Personal finance server started on: ' + port);