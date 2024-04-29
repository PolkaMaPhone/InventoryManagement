//const path = require('path');
//load environment variables from ../.env file
require('dotenv').config({ path: '../.env' });

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    schema: process.env.DB_SCHEMA || 'test_seed',
    port: process.env.DB_PORT,
    logging: console.log,
    define: {
      timestamps: true,
      schema: process.env.DB_SCHEMA || 'test_seed'
    },
    dialectOptions: {
      prependSearchPath: true,
      searchPath: process.env.DB_SCHEMA || 'test_seed'
    }
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    schema: process.env.DB_SCHEMA || 'test_seed',
    port: process.env.DB_PORT,
    logging: console.log,
    define: {
      timestamps: true,
      schema: process.env.DB_SCHEMA || 'test_seed'
    },
    dialectOptions: {
      prependSearchPath: true,
      searchPath: process.env.DB_SCHEMA || 'test_seed'
    }
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    schema: process.env.DB_SCHEMA || 'public',
    port: process.env.DB_PORT,
    logging: console.log,
    define: {
      timestamps: true,
      schema: process.env.DB_SCHEMA || 'public'
    },
    dialectOptions: {
      prependSearchPath: true,
      searchPath: process.env.DB_SCHEMA || 'public'
    }
  }
};