'use strict';

const endpoint = 'tags';

module.exports = ({ request }) => ({
  byName(name) {
    const params = {
      filters: {
        name: {
          $eq: name,
        },
      },
    };

    return request({ endpoint, params });
  },
});
