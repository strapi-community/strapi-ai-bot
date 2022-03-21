'use strict';

const path = require('path');
const dotenv = require('dotenv');
const { StrapiAI } = require('./lib/structures/StrapiAI');

// Setup ENV variables, must be outside function scope
dotenv.config({ path: path.join(__dirname, '..', '.env') });
if (dotenv.error) {
  throw new Error(dotenv.error);
}

// setup must be required after dotenv load, otherwise env variables will not be present
const setup = require('./lib/setup');

const client = new StrapiAI();

// IIFE for starting the bot
(async () => {
  try {
    client.logger.info('Attempting setup initialization.');
    setup.init();
    client.logger.info('Setup successfully.');
    client.logger.info('Attempting to log in.');
    await client.login();
    client.logger.info('Logged in successfully.');
  } catch (error) {
    client.logger.fatal(error);
    client.destroy();
    throw new Error(error);
  }
})();
