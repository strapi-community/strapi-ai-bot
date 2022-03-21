'use strict';

/**
 *
 * @param {string} string The string to remove the characters from
 * @param {string} char The character to remove
 * @return {string} The string with the character removed
 */
function remove(string, char) {
  return string.replace(`/${char}/g`, '');
}

module.exports = {
  remove,
};
