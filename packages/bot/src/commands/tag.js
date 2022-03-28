'use strict';

const { Command } = require('@sapphire/framework');
const { embedBuilder } = require('../lib/utils/embedBuilder');

class TagCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Search for a tag',
    });
  }

  async messageRun(message, args) {
    const { $api } = this.container;

    const tagTitle = await args.pick('string');
    const tag = await $api.tags.byTitle(tagTitle);

    if (!tag) {
      return message.reply(`A tag with the name \`${tagTitle}\` was not found.`);
    }

    return message.reply({
      embeds: [
        embedBuilder({
          title: tag.attributes.title,
          description: tag.attributes.content,
          timestamp: true,
        }),
      ],
    });
  }
}

module.exports = TagCommand;
