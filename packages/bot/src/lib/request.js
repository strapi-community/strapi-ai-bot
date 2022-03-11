'use strict';

// Import the fetch function
const qs = require('qs');
const { fetch } = require('@sapphire/fetch');
const { BACKEND_URL, API_PREFIX } = require('./config');

function buildRequestOptions(method, data) {
  const requestOptions = {
    method,
  };
  if (data) {
    requestOptions.body = JSON.stringify(data);
  }

  return requestOptions;
}

function buildRequestURL(endpoint, params) {
  let url = `${BACKEND_URL}/${API_PREFIX}/${endpoint}`;
  if (params) {
    const query = qs.stringify(params, {
      encodeValuesOnly: true,
    });
    url += `?${query}`;
  }
  return url;
}

async function processResponse(response) {
  const { status } = response;

  const body = await response.json();

  // non 200 or 300 response should error
  if (status < 200 || status >= 400) {
    throw new Error(body.error);
  }

  return body.data;
}

async function request({ endpoint, params, method = 'GET', data }) {
  const requestOptions = buildRequestOptions(method, data);
  const response = await fetch(buildRequestURL(endpoint, params), requestOptions);
  return processResponse(response);
}

module.exports = {
  request,
};
