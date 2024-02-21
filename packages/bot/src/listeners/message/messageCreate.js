'use strict';

const { Listener } = require('@sapphire/framework');
const { DISCOURSE_FAQ_CHANNELS } = require('../../lib/config');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class messageCreate extends Listener {
  constructor(context, options) {
    super(context, {
      ...options,
      event: 'messageCreate',
    });
  }

  async run(message) {
    const { $api } = this.container;
    const {
      channelId,
      id,
      channel: { parentId },
    } = message;

    // Proceed only if the channel of the message is a FAQ channel from discord only
    if (DISCOURSE_FAQ_CHANNELS.includes(parentId)) {
      // Wait for 2 sec since the threadCreate and messageCreate will occur at the same time.
      sleep(2000).then(async () => {
        const topic = await $api.discourse.getRelatedDiscordTopicOnDiscourse(channelId);
        if (topic === null) return;

        // Prevent the original message to be posted since the threadCreate will handle this already
        if (id !== channelId) {
          await $api.discourse.addPostToDiscordTopic(topic, message, id);
        } else {
          // Fetch the Discourse orignal post to append this message by channelId which is the id of the first message
          // If the post hasn't been found, the we can consider a retroactif logic...
          await $api.discourse.updateTopic(topic, message, channelId);
        }
      });
    }
  }
}

module.exports = messageCreate;
