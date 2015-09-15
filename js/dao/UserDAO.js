'use strict';

var AppConfig = require('../appconfig.json');
var promiseRequest = require('./PromiseRequest');

var GET_USER = 'getUser';
var GET_AUTH= 'getAuth';
var RESOURCE_URL = AppConfig.Host + '/users';
var AUTH_RESOURCE_URL = RESOURCE_URL + '/user_authorizations';

function getUser() {
  return promiseRequest(GET_USER, {
    type: 'GET',
    url: RESOURCE_URL
  });
}

function getAuth() {
  return promiseRequest(GET_AUTH, {
    type: 'GET',
    url: AUTH_RESOURCE_URL
  });
}

module.exports = {
  getUser: getUser,
  getAuth: getAuth
};
