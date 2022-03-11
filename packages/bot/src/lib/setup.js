'use strict';

const path = require('path');
const dotenv = require('dotenv');
const { inspect } = require('util');
const { createColors } = require('colorette');
const { container } = require('@sapphire/framework');
const { $api } = require('./api');

function init() {
  // Setup ENV variables
  dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

  if (dotenv.error) {
    throw new Error(dotenv.error);
  }

  // inspect
  // Set default inspection depth
  inspect.defaultOptions.depth = 1;

  // colorette
  createColors({ useColor: true });

  // sapphire specific plugins
  require('@sapphire/plugin-logger/register');

  // add container shortcuts
  container.$api = $api;
}

module.exports = {
  init,
};
