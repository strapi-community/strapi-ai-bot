'use strict';

const { MessageEmbed } = require('discord.js');
const { Command } = require('@sapphire/framework');
const { $api } = require('../lib/api');

class FAQCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Search for a faq',
    });
  }

  async messageRun(message, args) {
    const faqTitle = args.pick('string');
    const faq = await $api.faqs.byName(faqTitle);

    return message.send({ embeds: [this.buildFAQEmbed(faq)] });
  }

  buildFAQEmbed(faq) {
    return new MessageEmbed().setTitle(faq.title).setDescription(faq.content).setTimestamp();
  }
}

module.exports = FAQCommand;
