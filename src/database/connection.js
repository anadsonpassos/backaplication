const knex = require('knex');
const configuration = require('../../knexfile');

//const config = process.env.NODE_ENV == 'development' ? configuration.development : configuration.production;
const config = process.env.NODE_ENV ? configuration[process.env.NODE_ENV]: configuration.development;

console.log(config);

const connection = knex(config);

module.exports = connection;
