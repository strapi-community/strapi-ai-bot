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

    // dont send survey to bots
    if (member.user.bot) {
      return;
    }

    try {
      const joinedUser = await client.users.fetch(member.id);
      logger.debug(`Sending new user message to: ${joinedUser.username}`);
      await joinedUser.send({ embeds: [this.buildSurveyMessage(joinedUser)] });
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
  buildSurveyMessage(user) {
    return new MessageEmbed()
      .setColor('#5700df')
      .setTitle(`🙋‍♀️ Hello ${user.username}`)
      .setDescription(
        `You are now a member of the growing community at Strapi Community Discord Server. We have members from all over the world who build awesome projects, and support each other.\n\n👋 We'd **love** to get to know you a bit better, so please **[fill out this short survey](https://strapi.typeform.com/to/TLM3Ae?channel=U01JT604ER2)** then introduce yourself in the [#introduction channel](https://discord.gg/2ZVmbQAuKW)! \n\nIf you're stuck for things to say, here are a few ideas: \n- Where you're from? \n- What tech stack do you use? \n- Your experience with Strapi? \n- What have you been working on?`
      )
      .setTimestamp();
  }
}

module.exports = GuildMemberAddSendSurvey;
