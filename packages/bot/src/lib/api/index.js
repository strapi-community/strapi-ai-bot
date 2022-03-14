'use strict';

const { request } = require('../request');
const tags = require('./tags');
const faqs = require('./faqs');
const docs = require('./docs');

const $api = {
  tags: tags({ request }),
  faqs: faqs({ request }),
  docs: docs({ request }),
};

module.exports = {
  $api,
};
