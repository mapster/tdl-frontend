'use strict';

var PREFIX = 'EXERCISES';
var constants = [
  'EXERCISES_UPDATE_FROM_SERVER',
  'SOLUTIONS_UPDATE_FROM_SERVER'
];

var obj = {};
constants.forEach((c) => obj[c] = PREFIX + c);

obj.symbols = {
  expectation: 'question-sign',
  error: 'exclamation-sign',
  implementation: 'tower'
};

module.exports = obj;
