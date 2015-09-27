'use strict';

var PREFIX = 'ADMIN_USERS_STORE_';
var constants = [
  'ADD_USER',
  'CLOSE_EDIT_USER',
  'CONFIRM_DELETE_USER',
  'DISMISS_ERROR',
  'DISMISS_USER_ALERT',
  'EDIT_USER',
  'EDIT_USER_AUTHS',
  'SAVE_USER',
  'SAVE_AUTHS',
  'SET_DELETE_USER',
  'SHOW_ADD_USER_FORM',
  'USERS_UPDATE_FROM_SERVER'
];

var obj = {};
constants.forEach((c) => obj[c] = PREFIX + c);

module.exports = obj;
