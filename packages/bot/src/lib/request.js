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
  paramsSerializer: (params) => qs.stringify(params, { encodeValuesOnly: true }),
});

async function request({ endpoint, params, method = 'GET', data, headers }) {
  const response = await requestInstance({
    url: endpoint,
    method,
    params,
    data,
    headers,
  });

  return response.data;
}

module.exports = {
  request,
};
