'use strict';

const { request } = require('../request');
const tags = require('./tags');
const faqs = require('./faqs');

const $api = {
  tags: tags({ request }),
  faqs: faqs({ request }),
};

module.exports = {
  $api,
};
