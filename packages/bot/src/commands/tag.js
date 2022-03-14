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

    const tagName = await args.pick('string');
    const tag = await $api.tags.byName(tagName);

    if (!tag) {
      return message.channel.send(`A tag with the name ${tagName} was not found`);
    }

    return message.channel.send({ embeds: [this.buildTagEmbed(tag)] });
  }

  buildTagEmbed(tag) {
    return new MessageEmbed()
      .setTitle(tag.attributes.name)
      .setDescription(tag.attributes.content)
      .setTimestamp();
  }
}

module.exports = TagCommand;
