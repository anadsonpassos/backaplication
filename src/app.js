require("dotenv").config();

const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

const { Client } = require('pg');

client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded( { extended: true }));
app.use(routes);
app.use(errors());

// app.use(cors({
//         origin: 'http://localhost:3000'
//     }));

app.use((request, response, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
});

app.use((error, request, response, next) => {
    response.status(error.status || 500)
    response.json({ error: error.message })
});

// app.use((error, request, response, next) => {
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