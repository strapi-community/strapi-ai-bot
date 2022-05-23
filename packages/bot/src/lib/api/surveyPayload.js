'use strict';

const endpoint = 'new-member-survey';

module.exports = ({ request }) => ({
  async getPayload() {
    const params = {}

    const response = await request({ endpoint, params });

    if (response.data) {
      return response.data;
    }

    return null;
  },
});
