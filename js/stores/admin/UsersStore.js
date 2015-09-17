'use strict';

var assign = require('object-assign');

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var UsersDAO = require('../../dao/admin/UsersDAO');
var UsersConstants = require('../../constants/admin/UsersConstants');
var SessionConstants = require('../../constants/SessionConstants');
var ResponseConstants = require('../../constants/ResponseConstants');
var StoreListenBase = require('../StoreListenBase');
var PromiseHandlers = require('../PromiseHandlers');

var _users = false;
var _editUser = false;
var _editError = false;
var _deleteUser = false;

var UsersStore = assign({}, StoreListenBase, {
  getUsers: function() {
    if (!_users) {
      this.refreshUsers();
    }
    return _users;
  },
  refreshUsers: function() {
    var actionType = UsersConstants.USERS_UPDATE_FROM_SERVER;
    UsersDAO.getUsers()
      .then(PromiseHandlers.handleSuccess.bind(null, actionType))
      .catch(PromiseHandlers.handleNotFound.bind(null, [], actionType));
  },
  getEditUser: function() {
    return _editUser;
  },
  getDeleteUser: function() {
    return _deleteUser;
  },
  getEditError: function() {
    return _editError;
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  if(payload.source == AppDispatcher.VIEW_ACTION) {
    switch (action.actionType) {
      case UsersConstants.SET_DELETE_USER:
        _deleteUser = action.data;
        UsersStore.emitChange();
        break;
      case UsersConstants.CONFIRM_USER_DELETE:
        UsersDAO.deleteUser(_deleteUser.id)
          .then(function() {
            _deleteUser = false;
            UsersStore.refreshUsers();
          });
          //TODO Handle error responses
        break;
      case UsersConstants.EDIT_USER:
        _editUser = action.data;
        UsersStore.emitChange();
        break;
      case UsersConstants.CLOSE_EDIT_USER:
        _editUser = false;
        _editError = false;
        UsersStore.emitChange();
        break;
      case UsersConstants.SAVE_USER:
        UsersDAO.putUser(action.id, action.data)
          .then(function() {
            _editUser = false;
            UsersStore.refreshUsers();
          })
          //TODO Extract catch function into PromiseHandlers.
          .catch(function(response) {
            switch (response.status) {
              case 400:
                _editError = {
                  type: ResponseConstants.INVALID_DATA,
                  messages: JSON.parse(response.responseText)
                };
                UsersStore.emitChange();
                break;
              case 403:
                _editError = {
                  type: ResponseConstants.FORBIDDEN
                };
                break;
              case 404:
                _editError = {
                  type: ResponseConstants.NOT_FOUND
                };
                break;
              default:
                _editError = {
                  type: 'Uhandled error',
                  status: response.status,
                  messages: response.responseText
                };
            }
          });
        break;
      default:
    }
  }
  //==============
  // STORE_REFRESH
  //
  else {
    switch (action.actionType) {
      case UsersConstants.USERS_UPDATE_FROM_SERVER:
        _users = action.data;
        UsersStore.emitChange();
        break;
      case SessionConstants.SESSION_UPDATE_FROM_SERVER:
        UsersStore.refreshUsers();
        break;
      default:
    }
  }
});

module.exports = UsersStore;
