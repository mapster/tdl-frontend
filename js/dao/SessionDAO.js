'use strict';

var AppConfig = require('../appconfig.json');
var promiseRequest = require('./PromiseRequest');

var LOGIN = 'login';
var LOGOUT = 'logout';
var GET = 'get';
var RESOURCE_URL = AppConfig.Host + '/user_session';

function login(credentials) {
  return promiseRequest(LOGIN, {
    type: 'POST',
    url: RESOURCE_URL,
    contentType: 'application/json',
    data: JSON.stringify(credentials)
  });
}

function logout() {
  return promiseRequest(LOGOUT, {
    type: 'DELETE',
    url: RESOURCE_URL
  });
}

function getSession() {
  return promiseRequest(GET, {
    type: 'GET',
    url: RESOURCE_URL
  });
}

module.exports = {
  login: login,
  logout: logout,
  getSession: getSession
};
