'use strict';

var PREFIX = 'ADMIN_EXERCISES_STORE_';
var constants = [
  'DELETE_EXERCISE',
  'DELETE_SOURCE_FILE',
  'EDIT_EXERCISE',
  'EXERCISES_UPDATE_FROM_SERVER',
  'SAVE_EXERCISE',
  'SAVE_SOURCE_FILE',
  'SET_ALERT',
  'UPDATE_EDIT_EXERCISE_STATE'
];

var obj = {};
constants.forEach((c) => obj[c] = PREFIX + c);

module.exports = obj;
