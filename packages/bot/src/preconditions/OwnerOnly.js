'use strict';

const { Precondition } = require('@sapphire/framework');
const { OWNERS } = require('../lib/config');

class UserPrecondition extends Precondition {
  async run(message) {
    return OWNERS.includes(message.author.id)
      ? this.ok()
      : this.error({ message: 'This command can only be used by the OWNERS.' });
  }
}

module.exports = UserPrecondition;
