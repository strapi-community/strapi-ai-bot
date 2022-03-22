'use strict';

const { MessageEmbed } = require('discord.js');

function embedBuilder({ title, description, timestamp }) {
  const embed = new MessageEmbed();

  if (title && title.length) {
    embed.setTitle(title);
  }

  if (description && description.length) {
    embed.setDescription(description);
  }

  if (timestamp) {
    embed.setTimestamp();
  }

  return embed;
}

module.exports = {
  embedBuilder,
};
