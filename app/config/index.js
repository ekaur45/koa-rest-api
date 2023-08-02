'use strict';

const dotenv = require('dotenv');


// Load environment variables from .env file
dotenv.config();

const env = process.env.NODE_ENV || 'development';
const configs = {
  base: {
    env,
    name: process.env.APP_NAME || 'koa-rest-api-boilerplate',
    host: process.env.APP_HOST || '0.0.0.0',
    port: 7070
  },
  production: {
    port: process.env.APP_PORT || 7071,
    secret:process.env.SECRET || ''
  },
  development: {
    port: process.env.APP_PORT || 7071,
    secret:process.env.SECRET || ''
  },
  test: {
    port: 7072,
  }
};
const config = Object.assign(configs.base, configs[env]);

module.exports = config;
