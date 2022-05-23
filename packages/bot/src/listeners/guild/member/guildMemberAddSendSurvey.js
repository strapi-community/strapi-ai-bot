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
    const { client, logger } = this.container;
    const { $api } = this.container;
    const currentDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') 

    // dont send survey to bots
    if (member.user.bot) {
      return;
    }

    try {
      const joinedUser = await client.users.fetch(member.id);
      logger.debug(`Sending new user message to: ${joinedUser.username}`);
      await joinedUser.send({ embeds: [this.buildSurveyMessage(joinedUser, $api)] });
      await $api.surveyLog.send(joinedUser.username, true, currentDate)
    } catch (error) {
      logger.error(
        `The following error occurred while attempting to send the survey to a new member ${error.message}`
      );
      await $api.surveyLog.send(joinedUser.username, false, currentDate)
    }
  }

  /**
   * Builds the survey embed
   *
   * @param {User} user
   * @returns {MessageEmbed} embed The survey embed to send
   */
  async buildSurveyMessage(user, $api) {
    let payload = await $api.surveyPayload.getPayload()
    payload.title = `${payload.title} ${user.username}`

    return new MessageEmbed()
      .setColor(payload.color)
      .setTitle(payload.title)
      .setDescription(payload.description)
      .setTimestamp();
  }
}

module.exports = GuildMemberAddSendSurvey;
