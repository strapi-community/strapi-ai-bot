'use strict';

const { inspect } = require('util');
const { createColors } = require('colorette');
const { container } = require('@sapphire/framework');
const { $api } = require('./api');

function init() {
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
