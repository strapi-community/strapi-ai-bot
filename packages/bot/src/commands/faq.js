'use strict';

const { MessageEmbed } = require('discord.js');
const { Command } = require('@sapphire/framework');

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
    const faq = await $api.faqs.byName(faqTitle);

    if (!faq) {
      return message.channel.send(`A faq with the title ${faqTitle} was not found`);
    }

    return message.send({ embeds: [this.buildFAQEmbed(faq)] });
  }

  buildFAQEmbed(faq) {
    return new MessageEmbed()
      .setTitle(faq.attributes.title)
      .setDescription(faq.attributes.content)
      .setTimestamp();
  }
}

module.exports = FAQCommand;
