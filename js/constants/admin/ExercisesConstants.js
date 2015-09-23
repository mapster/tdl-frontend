'use strict';

var PREFIX = 'ADMIN_EXERCISES_STORE_';
var constants = [
  'SET_EXERCISE_EDITOR_STATE',
  'SHOW_ADD_EXERCISE'
];

var obj = {};
constants.forEach((c) => obj[c] = PREFIX + c);

module.exports = obj;
