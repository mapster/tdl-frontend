'use strict';

var PREFIX = 'ADMIN_USERS_STORE_';
var constants = [
  'USERS_UPDATE_FROM_SERVER',
  'CLOSE_EDIT_USER',
  'EDIT_USER',
  'SAVE_USER',
  'SET_DELETE_USER',
  'DISMISS_ERROR',
  'DISMISS_USER_ALERT',
  'ADD_USER',
  'SHOW_ADD_USER_FORM'
];

var obj = {};
constants.forEach((c) => obj[c] = PREFIX + c);

module.exports = obj;
