'use strict';

const { ALGOLIA_API_KEY, ALGOLIA_APPLICATION_ID } = require('../config');

const endpoint = `https://${ALGOLIA_APPLICATION_ID}-1.algolianet.com/1/indexes/documentation`;

const headers = {
  'X-Algolia-API-Key': ALGOLIA_API_KEY,
  'X-Algolia-Application-Id': ALGOLIA_APPLICATION_ID,
};

module.exports = ({ request }) => ({
  async searchByQuery(query) {
    const params = {
      query,
      hitsPerPage: 5,
      facetFilters: '["lang:en-US"]',
    };

    const response = await request({ endpoint, params, headers });

    return response.hits;
  },
});
