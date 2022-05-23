'use strict';

const endpoint = 'survey-logs';

module.exports = ({ request }) => ({
  async create(user, sentWithoutError, datetime) {
    const body = {
      discordUsername: user,
      sentWithoutError,
      sentDatetime: datetime,
    }

    const response = await request({ endpoint, params, method: 'POST', body });

    if (response.data) {
      return response.data;
    }

    return null;
  },
});
