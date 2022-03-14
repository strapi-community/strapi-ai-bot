'use strict';

const { Listener } = require('@sapphire/framework');

/**
 * This class is responsible for handling any command errors.
 */
class CommandError extends Listener {
  async run(error, commandPiece) {
    commandPiece.message.reply(this.getErrorMessage(error));
  }

  getErrorMessage(error) {
    if (error.response) {
      if (error.response.status === 500) {
        return 'The API was unable to process the request';
      }
      if (error.response.data) {
        return error.response.data.error.message;
      }
    }

    if (error.code === 'ECONNREFUSED') {
      return 'Unable to connect to the API, please try again later';
    }

    return error.message;
  }
}

module.exports = CommandError;
