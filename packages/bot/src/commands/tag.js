'use strict';

const { MessageEmbed } = require('discord.js');
const { Command } = require('@sapphire/framework');

class TagCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Search for a tag',
    });
  }

  async messageRun(message, args) {
    const { $api } = this.container;

    const tagName = args.pick('string');
    const tag = await $api.tags.byName(tagName);

    return message.channel.send({ embeds: [this.buildTagEmbed(tag[0])] });
  }

  buildTagEmbed(tag) {
    return new MessageEmbed()
      .setTitle(tag.attributes.name)
      .setDescription(tag.attributes.content)
      .setTimestamp();
  }
}

module.exports = TagCommand;
