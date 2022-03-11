'use strict';

// https://github.com/lodash/lodash/blob/master/has.js
/**
 *
 * @param {object} object The object to search
 * @param {string} key The key to search for
 * @returns {boolean} Indicating wether the passed in object contains the provided key
 */
function has(object, key) {
  return object != null && hasOwnProperty.call(object, key);
}

module.exports = {
  has,
};
