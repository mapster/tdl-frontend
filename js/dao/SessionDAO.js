'use strict';

//var Promise = require('es6-promise').Promise;
var $ = require('jquery');

var AppConfig = require('../appconfig.json');

var LOGIN = 'login';
var LOGOUT = 'logout';
var GET = 'get';
var RESOURCE_URL = AppConfig.Host + '/user_session';

var _promises = [];

function login(credentials) {
  return _promiseRequest(LOGIN, {
    type: 'POST',
    url: RESOURCE_URL,
    contentType: 'application/json',
    data: JSON.stringify(credentials)
  });
}

function logout() {
  return _promiseRequest(LOGOUT, {
    type: 'DELETE',
    url: RESOURCE_URL
  });
}

function getSession() {
  return _promiseRequest(GET, {
    type: 'GET',
    url: RESOURCE_URL
  });
}

function _promiseRequest(promiseID, requestSettings) {
  if (!_promises[promiseID]) {
    _promises[promiseID] = new Promise((resolve, reject) => {
      requestSettings.success = _promiseFulfilled(promiseID, resolve);
      requestSettings.error = _promiseFulfilled(promiseID, reject);
      $.ajax(requestSettings);
    });
  }
  return _promises[promiseID];
}

function _promiseFulfilled(promiseID, callback) {
  return function(arg1, arg2, arg3) {
    delete _promises[promiseID];
    callback(arg1, arg2, arg3);
  };
}

module.exports = {
  login: login,
  logout: logout,
  getSession: getSession
};
