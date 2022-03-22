'use strict';

const { Command } = require('@sapphire/framework');
const { embedBuilder } = require('../lib/utils/embedBuilder');

class FAQCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Search for a faq',
    });
  }

  async messageRun(message, args) {
    const { $api } = this.container;

    const faqTitle = await args.pick('string');
    const faq = await $api.faqs.byTitle(faqTitle);

    if (!faq) {
      return message.reply(`A faq with the title \`${faqTitle}\` was not found.`);
    }

    return message.reply({
      embeds: [
        embedBuilder({
          title: faq.attributes.title,
          description: faq.attributes.content,
          timestamp: true,
        }),
      ],
    });
  }
}

module.exports = FAQCommand;
