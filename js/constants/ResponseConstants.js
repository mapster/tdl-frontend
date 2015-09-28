'use strict';

var PREFIX = 'RESPONSE_';
var constants = [
  'OK',
  'INVALID_DATA',
  'NOT_FOUND',
  'FORBIDDEN',
  'INTERNAL_ERROR',
  'ERROR'
];

var obj = {};
constants.forEach((c) => obj[c] = PREFIX + c);

module.exports = obj;
