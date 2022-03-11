'use strict';

const { MessageEmbed } = require('discord.js');
const { Command } = require('@sapphire/framework');
const { $api } = require('../lib/api');

class TagCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Search for a tag',
    });
  }

  async messageRun(message, args) {
    const tagName = args.pick('string');
    const tag = await $api.tags.byName(tagName);

    return message.send({ embeds: [this.buildTagEmbed(tag)] });
  }

  buildTagEmbed(tag) {
    return new MessageEmbed().setTitle(tag.name).setDescription(tag.content).setTimestamp();
  }
}

module.exports = TagCommand;
