'use strict';

const { env } = require('./utils/env');

module.exports = {
  owners: env.array('OWNERS'),
  backendUrl: env('BACKEND_URL', 'http://localhost:1337'),
};
