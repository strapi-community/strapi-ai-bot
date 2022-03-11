'use strict';

const { LogLevel, SapphireClient } = require('@sapphire/framework');
const { Intents } = require('discord.js');
const setup = require('./lib/setup');

// IIFE for starting the bot
(async () => {
  // Setup discord bot client
  const client = new SapphireClient({
    logger: {
      level: LogLevel.Debug,
    },
    shards: 'auto',
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_BANS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.DIRECT_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    ],
  });

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
