'use strict';

var PREFIX = 'ADMIN_USERS_STORE_';
var constants = [
  'DELETE_USER',
  'EDIT_USER_AUTHS',
  'SAVE_AUTHS',
  'SAVE_USER',
  'UPDATE_EDIT_USER_STATE',
  'UPDATE_USER_ALERTS',
  'USERS_UPDATE_FROM_SERVER'
];

var obj = {};
constants.forEach((c) => obj[c] = PREFIX + c);

module.exports = obj;
