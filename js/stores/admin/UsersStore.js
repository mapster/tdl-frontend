'use strict';

var assign = require('object-assign');

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var UsersDAO = require('../../dao/admin/UsersDAO');
var UsersConstants = require('../../constants/admin/UsersConstants');
var SessionConstants = require('../../constants/SessionConstants');
var StoreListenBase = require('../StoreListenBase');

var _users = false;
var _editUser = false;
var _editError = false;

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
      .then(_updateFromServer.bind(null, actionType))
      .catch(_updateFromServerError.bind(null, actionType));
  },
  getEditUser: function() {
    return _editUser;
  },
  getEditError: function() {
    return _editError;
  }
});

function _updateFromServer(actionType, response) {
  AppDispatcher.handleStoreRefreshAction({
    actionType: actionType,
    data: response
  });
}

function _updateFromServerError(actionType, response) {
  if (response.status == 404) {
    AppDispatcher.handleStoreRefreshAction({
      actionType: actionType,
      data: []
    });
  }
}

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.actionType) {
    case UsersConstants.USERS_UPDATE_FROM_SERVER:
      _users = action.data;
      UsersStore.emitChange();
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
        .catch(function(response) {
          switch (response.status) {
            case 400:
              _editError = {
                type: UsersConstants.INVALID_USER_DATA,
                messages: JSON.parse(response.responseText)
              };
              UsersStore.emitChange();
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
    case SessionConstants.SESSION_UPDATE_FROM_SERVER:
      UsersStore.refreshUsers();
      break;
    default:
  }
});

module.exports = UsersStore;
