require("dotenv").config();

const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const { Client } = require('pg');

client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded( { extended: true }));
app.use(routes);
app.use(errors());

// app.use((req, res, next) => {
//     allowedOrigins = ['http: // localhost: 3000', 'http://localhost:3001', 'https://agiltech.herokuapp.com'];
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header(
//         'Access-Control-Allow-Header',
//         'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );
  
//       if (req.method === 'OPTIONS') {
//           res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//           return res.status(200).json({});
//     }
//     next();
//   });


module.exports = app;