'use strict';

const { env } = require('./utils/env');

module.exports = {
  OWNERS: env.array('OWNERS'),
  BACKEND_URL: env('BACKEND_URL', 'http://localhost:1337'),
  API_PREFIX: env('API_PREFIX', 'api'),
  ALGOLIA_API_KEY: env('ALGOLIA_API_KEY'),
  ALGOLIA_APPLICATION_ID: env('ALGOLIA_APPLICATION_ID'),
};
