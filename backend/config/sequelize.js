require('dotenv').config({ path: '../.env' });
const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

const sequelize = new Sequelize(config);
// console.debug('Database connection details from Sequelize.js:', sequelize.config);
// console.debug('env:', env);
// console.debug('config:', config);
// console.debug('sequelize options:', sequelize.options);

module.exports = sequelize;