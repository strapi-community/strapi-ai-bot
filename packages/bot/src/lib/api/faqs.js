'use strict';

const endpoint = 'faqs';

module.exports = ({ request }) => ({
  async byTitle(title) {
    const params = {
      filters: {
        title: {
          $eq: title,
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
