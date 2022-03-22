'use strict';

const { Command } = require('@sapphire/framework');
const { embedBuilder } = require('../lib/utils/embedBuilder');

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
      return message.reply(`No documentation can be found for \`${query}\`.`);
    }

    return message.reply({
      embeds: [
        embedBuilder({
          title: `Search Results for \`${query}\``,
          description: this.buildDescription(hits),
          timestamp: true,
        }),
      ],
    });
  }

  buildDescription(hits) {
    return hits.map((h, i) => this.buildHitDescription(h, i)).join('\n\n');
  }

  buildHitDescription(hit, position) {
    return `${position + 1}. [${this.buildHitTitle(hit.hierarchy)}](${this.buildHitURL(hit)})`;
  }

  buildHitTitle(titleHierarchy) {
    let title = '';

    if (titleHierarchy.lvl1 && titleHierarchy.lvl1.length) {
      title += `\`${titleHierarchy.lvl1}\``;
    }

    if (titleHierarchy.lvl2 && titleHierarchy.lvl1.length) {
      title += title.length ? ` ${titleHierarchy.lvl2}` : `\`${titleHierarchy.lvl2}\``;
    }

    return this.removeHexCodeCharacters(title);
  }

  buildHitURL(hit) {
    return hit.url;
  }

  removeHexCodeCharacters(title) {
    const apostropheHexCodeRegex = /&#x27;/gi;
    return title.replace(apostropheHexCodeRegex, "'");
  }
}

module.exports = DocsCommand;
