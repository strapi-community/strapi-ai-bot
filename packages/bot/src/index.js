'use strict';

require('./lib/setup');
const { LogLevel, SapphireClient } = require('@sapphire/framework');
const { Intents } = require('discord.js');
const { discordToken } = require('./config');

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

const main = async () => {
  try {
    client.logger.info('Logging in');
    await client.login(discordToken);
    client.logger.info('logged in');
  } catch (error) {
    client.logger.fatal(error);
    client.destroy();
    throw new Error(error);
  }
};

main();
