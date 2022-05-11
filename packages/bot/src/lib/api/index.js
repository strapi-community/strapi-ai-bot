'use strict';

const { request } = require('../request');
const faqs = require('./faqs');
const docs = require('./docs');

const $api = {
  faqs: faqs({ request }),
  docs: docs({ request }),
};

module.exports = {
  $api,
};
