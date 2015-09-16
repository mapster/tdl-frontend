'use strict';

var assign = require('object-assign');

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var UsersDAO = require('../../dao/admin/UsersDAO');
var UsersConstants = require('../../constants/admin/UsersConstants');
var SessionConstants = require('../../constants/SessionConstants');
var StoreListenBase = require('../StoreListenBase');

var _users = false;

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
    case SessionConstants.SESSION_UPDATE_FROM_SERVER:
      UsersStore.refreshUsers();
      break;
    default:
  }
});

module.exports = UsersStore;
