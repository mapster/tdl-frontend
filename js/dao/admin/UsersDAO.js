'use strict';

var AppConfig = require('../../appconfig.json');
var promiseRequest = require('../PromiseRequest');

var DELETE_USER = 'deleteUser';
var GET_AUTH = 'getAuth';
var GET_USERS = 'getUsers';
var PUT_AUTHS = 'putAuths';
var PUT_USER = 'getUser';

var RESOURCE_URL = AppConfig.Host + '/admin/users';
var AUTH_SUB_RESOURCE = 'user_authorizations';

var UsersDAO = {
  deleteUser: function(id) {
    return promiseRequest(DELETE_USER, {
      type: 'DELETE',
      url: RESOURCE_URL + '/' + id
    });
  },

  getAuth: function(userId) {
    return promiseRequest(GET_AUTH, {
      type: 'GET',
      url: RESOURCE_URL + '/' + userId + '/' + AUTH_SUB_RESOURCE
    });
  },

  getUsers: function() {
    return promiseRequest(GET_USERS, {
      type: 'GET',
      url: RESOURCE_URL
    });
  },

  putAuths: function(id, auths) {
    return promiseRequest(PUT_AUTHS, {
      type: 'PUT',
      url: RESOURCE_URL + '/' + id + '/' + AUTH_SUB_RESOURCE,
      data: JSON.stringify(auths),
      contentType: 'application/json'
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
  }
};

module.exports = UsersDAO;
