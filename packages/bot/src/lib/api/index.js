'use strict';

const { request } = require('../request');
const faqs = require('./faqs');
const docs = require('./docs');
const discourse = require('./discourse')

const $api = {
  faqs: faqs({ request }),
  docs: docs({ request }),
  discourse: discourse({ request }),
};

module.exports = {
  $api,
};
