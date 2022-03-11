'use strict';

const endpoint = 'faqs';

module.exports = ({ request }) => ({
  byTitle(title) {
    const params = {
      filters: {
        title: {
          $eq: title,
        },
      },
    };

    return request({ endpoint, params });
  },
});
