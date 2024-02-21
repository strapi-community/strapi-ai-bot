'use strict';

const { env } = require('./utils/env');

module.exports = {
  OWNERS: env.array('OWNERS'),
  BACKEND_URL: env('BACKEND_URL', 'http://localhost:1337'),
  API_PREFIX: env('API_PREFIX', 'api'),
  ALGOLIA_API_KEY: env('ALGOLIA_API_KEY'),
  ALGOLIA_APPLICATION_ID: env('ALGOLIA_APPLICATION_ID'),
  DISCOURSE_URL: env('DISCOURSE_URL', 'https://forum.strapi.io'),
  DISCOURSE_API_KEY: env('DISCOURSE_API_KEY'),
  DISCOURSE_FAQ_CHANNELS: env('DISCOURSE_FAQ_CHANNELS', [
    /* strapi-questions*/ '1019655562092355594',
    /* frontend-questions*/ '1058454253238235248',
    /* deployment-questions*/ '1058489260531007499',
  ]),
};
