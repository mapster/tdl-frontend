'use strict';

var PREFIX = 'ADMIN_EXERCISES_STORE_';
var constants = [
  'EDIT_EXERCISE',
  'EDIT_EXERCISE_SOURCES_UPDATE_FROM_SERVER',
  'EXERCISES_UPDATE_FROM_SERVER',
  'SAVE_EXERCISE',
  'SET_ALERT',
  'SET_EXERCISE_EDITOR_STATE'
];

var obj = {};
constants.forEach((c) => obj[c] = PREFIX + c);

module.exports = obj;
