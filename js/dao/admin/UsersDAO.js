'use strict';

var AppConfig = require('../../appconfig.json');
var promiseRequest = require('../PromiseRequest');

var GET_USERS = 'getUsers';
var RESOURCE_URL = AppConfig.Host + '/admin/users';

function getUsers() {
  return promiseRequest(GET_USERS, {
    type: 'GET',
    url: RESOURCE_URL
  });
}

module.exports = {
  getUsers: getUsers
};
