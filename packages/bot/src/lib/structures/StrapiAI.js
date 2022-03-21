'use strict';

const { LogLevel, SapphireClient } = require('@sapphire/framework');
const { Intents } = require('discord.js');
const { env } = require('../utils/env');

class StrapiAI extends SapphireClient {
  constructor() {
    super({
      logger: {
        level: env('NODE_ENV') === 'production' ? LogLevel.Info : LogLevel.Debug,
      },
      loadDefaultErrorListeners: false,
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
  }
}

module.exports = {
  StrapiAI,
};
