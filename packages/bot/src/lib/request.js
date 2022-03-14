'use strict';

// Import the fetch function
const qs = require('qs');
const axios = require('axios');
const { BACKEND_URL, API_PREFIX } = require('./config');

const requestInstance = axios.create({
  baseURL: `${BACKEND_URL}/${API_PREFIX}`,
  timeout: 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

async function request({ endpoint, params, method = 'GET', data }) {
  const response = await requestInstance({
    url: endpoint,
    method,
    params: qs.stringify(params, {
      encodeValuesOnly: true,
    }),
    data,
  });
  return response.data;
}

module.exports = {
  request,
};
