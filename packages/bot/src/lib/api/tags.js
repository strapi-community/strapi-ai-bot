'use strict';

const endpoint = 'tags';

module.exports = ({ request }) => ({
  async byName(name) {
    const params = {
      filters: {
        name: {
          $eq: name,
        },
      },
    };

    const response = await request({ endpoint, params });

    if (response.data && response.data.length) {
      return response.data[0];
    }

    return null;
  },
});
