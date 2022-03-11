'use strict';

const path = require('path');
const dotenv = require('dotenv');
const { createColors } = require('colorette');

function init() {
  // Setup ENV variables
  dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

  if (dotenv.error) {
    throw new Error(dotenv.error);
  }

  // colorette
  createColors({ useColor: true });

  // sapphire specific plugins
  require('@sapphire/plugin-logger/register');
}

module.exports = {
  init,
};
