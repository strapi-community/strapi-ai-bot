'use strict';

const { Listener } = require('@sapphire/framework');
const { MessageEmbed } = require('discord.js');

/**
 * This class is responsible for sending a survey message
 * when a new member join the discord server.
 */
class GuildMemberAddSendSurvey extends Listener {
  constructor(context, options) {
    super(context, {
      ...options,
      event: 'guildMemberAdd',
    });
  }

  async run(member) {
    const { client, logger, $api } = this.container;

    const getSurvey = await $api.newUserSurvey.getSurvey();

    // dont send survey to bots
    if (member.user.bot) {
      return;
    }

    try {
      const joinedUser = await client.users.fetch(member.id);
      logger.debug(`Sending new user message to: ${joinedUser.username}`);
      await joinedUser.send({
        embeds: [this.buildSurveyMessage(joinedUser, getSurvey)],
      });
    } catch (error) {
      logger.error(
        `The following error occurred while attempting to send the survey to a new member ${error.message}`
      );
    }
  }

  /**
   * Builds the survey embed
   *
   * @param {User} user
   * @returns {MessageEmbed} embed The survey embed to send
   */
  buildSurveyMessage(user, getSurvey) {
    console.log(getSurvey);

    return new MessageEmbed()
      .setColor('#5700df')
      .setTitle(`🙋‍♀️ Hello ${user.username}`)
      .setDescription(`This is a TEST hello ${user.username}`)
      .setTimestamp();
  }
}

module.exports = GuildMemberAddSendSurvey;
