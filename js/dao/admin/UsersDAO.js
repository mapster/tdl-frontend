'use strict';

var AppConfig = require('../../appconfig.json');
var promiseRequest = require('../PromiseRequest');

var GET_USERS = 'getUsers';
var PUT_USER = 'getUser';
var RESOURCE_URL = AppConfig.Host + '/admin/users';

function getUsers() {
  return promiseRequest(GET_USERS, {
    type: 'GET',
    url: RESOURCE_URL
  });
}

function putUser(id, user) {
  return promiseRequest(PUT_USER, {
    type: 'PUT',
    url: RESOURCE_URL + '/' + id,
    data: JSON.stringify(user),
    contentType: 'application/json'
  });
}

module.exports = {
  getUsers: getUsers,
  putUser: putUser
};
