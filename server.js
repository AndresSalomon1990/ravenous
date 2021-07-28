const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();
const path = require('path');
const favicon = require('serve-favicon');
const fetch = require('node-fetch');

/* CORS */
const isProduction = process.env.NODE_ENV === 'production';
const origin = {
  origin: isProduction ? 'https://react-app-ravenous.herokuapp.com/' : 'http://localhost:5000/',
};

/* Middlewares */
app.use(compression());
app.use(cors(origin));
app.use(helmet.hsts());
app.use(helmet.expectCt());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy()); // only for Express
app.use(helmet.xssFilter());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* PORT - 5000 default for localhost */
const PORT = process.env.PORT || 5000;

// static files
if (process.env.NODE_ENV === 'production') {
  // production
  app.use(express.static(path.join(__dirname, 'build')));
  app.use(favicon(path.join(__dirname, '/build/favicon.ico')));
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
} else {
  // development
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}
/* Route to get data from Yelp API */
app.get('/yelp', (req, res) => {
  // res.send('<h1>Hello there</h1>')
  const term = req.query.term;
  const location = req.query.location;
  const sortBy = req.query.sortBy;
  const uri = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
  const options = {
    method: 'GET',
    headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` }
  }

  fetch(uri, options)
    .then(response => response.json())
    .then(jsonData => res.status(200).json(jsonData))
    .catch(err => res.status(400).json({ err: err }));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listen at port: ${PORT}`);
})