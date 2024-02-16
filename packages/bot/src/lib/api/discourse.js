'use strict';

const { DISCOURSE_URL, DISCOURSE_API_KEY } = require('../config');

const discourseItems = [
  {
    discordChannelId: '1019655562092355594',
    discourseCategory: 30,
  },
  {
    discordChannelId: '1058454253238235248',
    discourseCategory: 32,
  },
  {
    discordChannelId: '1058489260531007499',
    discourseCategory: 31,
  },
];

const headers = {
  'Content-type': 'application/json',
  'Api-Key': DISCOURSE_API_KEY,
};

module.exports = ({ request }) => ({
  async createTopic(id, name, parentId) {
    try {
      await request({
        endpoint: `${DISCOURSE_URL}/posts.json`,
        method: 'POST',
        headers,
        data: JSON.stringify({
          title: name,
          raw: `This topic has been created from a Discord post ${id}`,
          category: discourseItems.find((item) => item.discordChannelId === parentId)?.discourseCategory,
          external_id: id,
        }),
      });
    } catch (error) {
      console.log(error?.repsonse?.data);
    }
  },

  async getRelatedDiscordTopicOnDiscourse(channelId) {
    try {
      const data = await request({
        endpoint: `${DISCOURSE_URL}/search.json?q=${channelId}`,
        method: 'GET',
        headers,
      });
      const { posts } = data;

      if (posts?.length > 0) {
        return posts?.[0];
      } else {
        return null;
      }
    } catch (error) {
      console.log(error?.repsonse?.data);
    }
  },

  async addPostToDiscordTopic(topic, message, id) {
    try {
      await request({
        endpoint: `${DISCOURSE_URL}/posts.json`,
        method: 'POST',
        headers,
        data: JSON.stringify({
          raw: message?.content,
          topic_id: topic?.topic_id,
          external_id: id,
          reply_to_post_number: topic?.post_number,
        }),
      });
    } catch (error) {
      console.log(error?.repsonse?.data);
    }
  },

  async updateTopic(topic, message, channelId) {
    try {
      await request({
        endpoint: `${DISCOURSE_URL}/posts/${topic?.id}`,
        method: 'PUT',
        headers,
        data: JSON.stringify({
          post: {
            raw: `${message?.content}\n\n<i>This topic has been created from a Discord post (${channelId}) to give it more visibility.\nIt will be on Read-Only mode here.\n<a href="${message?.url}">Join the conversation on Discord</a></i>`,
            edit_reason: 'Discord bot',
          },
        }),
      });

      await request({
        endpoint: `${DISCOURSE_URL}/t/${topic?.id}/status.json`,
        method: 'PUT',
        headers,
        data: JSON.stringify({
          status: 'closed',
          enabled: 'true',
        }),
      });
    } catch (error) {
      console.log(error?.repsonse?.data);
    }
  },
});
