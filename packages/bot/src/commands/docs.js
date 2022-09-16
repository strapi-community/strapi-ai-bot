'use strict';

const { Command } = require('@sapphire/framework');
const { isMessageInstance } = require('@sapphire/discord.js-utilities');
const { embedBuilder } = require('../lib/utils/embedBuilder');

class DocsCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      name: 'docs',
      description: 'Search the Strapi documentation',
    });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName(this.name)
        .setDescription(this.description)
        .addStringOption((option) =>
          option.setName('term').setDescription('The term to search the docs for').setRequired(true)
        )
    );
  }

  async chatInputRun(interaction) {
    const { $api } = this.container;
    const query = interaction.options.getString('term');
    const msg = await interaction.reply({
      content: `Searching the Strapi docs for ${query} .....`,
      ephemeral: true,
      fetchReply: true,
    });

    if (isMessageInstance(msg)) {
      const hits = await $api.docs.searchByQuery(query);
      if (!hits || !hits.length) {
        return interaction.editReply(`No documentation can be found for \`${query}\`.`);
      }

      return interaction.editReply({
        embeds: [
          embedBuilder({
            title: `Search results for \`${query}\``,
            description: this.buildDescription(hits),
            timestamp: true,
          }),
        ],
      });
    }

    return interaction.editReply('Only slash commands are supported');
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
