'use strict';

const path = require('path');
const dotenv = require('dotenv');
const { inspect } = require('util');
const { createColors } = require('colorette');

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
}

module.exports = {
  init,
};
