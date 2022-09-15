'use strict';

const { Command } = require('@sapphire/framework');
const { isMessageInstance } = require('@sapphire/discord.js-utilities');
const { embedBuilder } = require('../lib/utils/embedBuilder');

class FAQCommand extends Command {
  constructor(context, options) {
    super(context, { ...options, name: 'faq', description: 'Search for an faq' });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName(this.name)
        .setDescription(this.description)
        .addStringOption((option) =>
          option.setName('title').setDescription('The faq title').setRequired(true)
        )
    );
  }

  async chatInputRun(interaction) {
    const { $api } = this.container;
    const faqTitle = interaction.options.getString('title');
    const msg = await interaction.reply({
      content: `Fetching faq with title ${faqTitle} .....`,
      ephemeral: true,
      fetchReply: true,
    });
    if (isMessageInstance(msg)) {
      const faq = await $api.faqs.byTitle(faqTitle);

      if (!faq) {
        return interaction.editReply(`A faq with the title \`${faqTitle}\` was not found.`);
      }
      return interaction.editReply({
        embeds: [
          embedBuilder({
            title: faq.attributes.title,
            description: faq.attributes.content,
            timestamp: true,
          }),
        ],
      });
    }

    return interaction.editReply('Only slash commands are supported');
  }
}

module.exports = FAQCommand;
