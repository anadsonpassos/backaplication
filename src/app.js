require("dotenv").config();

const express = require('express');
const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.urlencoded( { extended: false }));
app.use(express.json());
app.use(routes);
app.use(errors());

app.use((req, res, next) => {
  allowedOrigins = ['http: // localhost: 3000', 'http://localhost:3001', 'https://agiltech.herokuapp.com'];
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
      'Access-Control-Allow-Header',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        return res.status(200).json({});
  }
  next();
});

module.exports = app;