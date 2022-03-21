'use strict';

const { MessageEmbed } = require('discord.js');
const { Command } = require('@sapphire/framework');

class DocsCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Search the Strapi documentation',
    });
  }

  async messageRun(message, args) {
    const { $api } = this.container;

    const query = await args.rest('string');
    const hits = await $api.docs.searchByQuery(query);

    if (!hits || !hits.length) {
      return message.channel.send(`No documentation can be found for ${query}.`);
    }

    return message.reply({ embeds: [this.buildDocsEmbed(hits)] });
  }

  buildDocsEmbed(hits) {
    return new MessageEmbed()
      .setTitle('Strapi Doc Search Results')
      .setDescription(hits.map((h) => this.getHitDescription(h)).join('\n'))
      .setTimestamp();
  }

  getHitDescription(hit) {
    return `[${this.getHitTitle(hit.hierarchy)}](${(this, this.getHitURL(hit))})`;
  }

  getHitTitle(titleHierarchy) {
    let title = '';
    for (const key in titleHierarchy) {
      if (Object.prototype.hasOwnProperty.call(titleHierarchy, key)) {
        if (!titleHierarchy[key]) {
          break;
        }

        title = titleHierarchy[key];
      }
    }

    return this.removeHexCodeCharacters(title);
  }

  getHitURL(hit) {
    return hit.url;
  }

  removeHexCodeCharacters(title) {
    const apostropheHexCodeRegex = /&#x27;/gi;
    return title.replace(apostropheHexCodeRegex, "'");
  }
}

module.exports = DocsCommand;
