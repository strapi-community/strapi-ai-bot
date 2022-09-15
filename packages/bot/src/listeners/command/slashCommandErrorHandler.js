'use strict';

const { Listener } = require('@sapphire/framework');

/**
 * This class is responsible for handling any command errors.
 */
class SlashCommandErrorHandler extends Listener {
  constructor(context, options) {
    super(context, { ...options, event: 'chatInputCommandError' });
  }

  async run(error, context) {
    return context.interaction.editReply(this.getErrorMessage(error));
  }

  getErrorMessage(error) {
    if (error.response) {
      if (error.response.status === 500) {
        return 'The API was unable to process the request';
      }
      if (error.response.data && error.response.data.error) {
        return error.response.data.error.message;
      }
    }

    if (error.code === 'ECONNREFUSED') {
      return 'Unable to connect to the API, please try again later';
    }

    return error.message;
  }
}

module.exports = SlashCommandErrorHandler;
