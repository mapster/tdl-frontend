'use strict';

var AppConfig = require('../../appconfig.json');
var promiseRequest = require('../PromiseRequest');

var GET_USERS = 'getUsers';
var PUT_USER = 'getUser';
var DELETE_USER = 'deleteUser';
var RESOURCE_URL = AppConfig.Host + '/admin/users';

var UsersDAO = {
  getUsers: function() {
    return promiseRequest(GET_USERS, {
      type: 'GET',
      url: RESOURCE_URL
    });
  },

  putUser: function(id, user) {
    return promiseRequest(PUT_USER, {
      type: 'PUT',
      url: RESOURCE_URL + '/' + id,
      data: JSON.stringify(user),
      contentType: 'application/json'
    });
  },

  postUser: function(user) {
    return promiseRequest(PUT_USER, {
      type: 'POST',
      url: RESOURCE_URL,
      data: JSON.stringify(user),
      contentType: 'application/json'
    });
  },

  deleteUser: function(id) {
    return promiseRequest(DELETE_USER, {
      type: 'DELETE',
      url: RESOURCE_URL + '/' + id
    });
  }
};

module.exports = UsersDAO;
