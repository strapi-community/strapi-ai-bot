'use strict';

const { Listener } = require('@sapphire/framework');
const { DISCOURSE_FAQ_CHANNELS } = require('../../lib/config');

class threadCreate extends Listener {
  constructor(context, options) {
    super(context, {
      ...options,
      event: 'threadCreate',
    });
  }

  async run(thread) {
    const { $api } = this.container;

    /* A Discord FAQ post `parentId` will always be the `channelId`. */
    const { id, parentId, name } = thread;

    /* Only create Discourse topic for the channels above */
    if (DISCOURSE_FAQ_CHANNELS.includes(parentId)) {
      /* Call Discourse API to create post containing the id of the post in the text for being able to find it later */
      await $api.discourse.createTopic(id, name);
    }
  }
}

module.exports = threadCreate;
