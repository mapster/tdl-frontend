'use strict';

var PREFIX = 'ADMIN_USERS_STORE_';
var constants = [
  'DELETE_USER',
  'DISMISS_ALERT',
  'DISMISS_USER_ALERT',
  'EDIT_USER_AUTHS',
  'SAVE_USER',
  'SAVE_AUTHS',
  'SET_DELETE_USER',
  'UPDATE_EDIT_USER_STATE',
  'USERS_UPDATE_FROM_SERVER'
];

var obj = {};
constants.forEach((c) => obj[c] = PREFIX + c);

module.exports = obj;
