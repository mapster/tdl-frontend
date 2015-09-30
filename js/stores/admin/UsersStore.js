'use strict';

var assign = require('object-assign');

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var UsersDAO = require('../../dao/admin/UsersDAO');
var UsersConstants = require('../../constants/admin/UsersConstants');
var SessionConstants = require('../../constants/SessionConstants');
var StoreListenBase = require('../StoreListenBase');
var PromiseHandlers = require('../PromiseHandlers');


var _users = false;
var _editUserState = false;
var _editUserAuths = false;
var _error = false;
var _deleteUser = false;
var _userAlerts = {};

var UsersStore = assign({}, StoreListenBase, {
  getUsers: function() {
    if (!_users) {
      _users = [];
      this.refreshUsers();
    }
    return _users;
  },
  getEditUserState: function() {
    return _editUserState;
  },
  getEditUserAuths: function() {
    return _editUserAuths;
  },
  getDeleteUser: function() {
    return _deleteUser;
  },
  getError: function() {
    return _error;
  },
  getUserAlerts: function() {
    return _userAlerts;
  },
  // state changes (setters)
  refreshUsers: function() {
    var actionType = UsersConstants.USERS_UPDATE_FROM_SERVER;
    UsersDAO.getUsers()
      .then(PromiseHandlers.handleSuccess.bind(null, actionType))
      .catch(PromiseHandlers.handleNotFound.bind(null, [], actionType));
  },
  setError: function(error) {
    _error = error;
    this.emitChange();
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
      case UsersConstants.EDIT_USER:
        _editUserState = action.data;
        UsersStore.emitChange();
        break;
      case UsersConstants.CLOSE_EDIT_USER:
        _editUserState = false;
        _error = false;
        UsersStore.emitChange();
        break;
      case UsersConstants.DISMISS_ALERT:
        UsersStore.setError(false);
        break;
      case UsersConstants.DISMISS_USER_ALERT:
        var change = Object.assign({}, _userAlerts);
        change[action.id] = false;
        _userAlerts = change;
        UsersStore.emitChange();
        break;
      default:
    }
  }
  //==============
  // STORE_REFRESH
  //
  else if(payload.source == AppDispatcher.STORE_REFRESH){
    switch (action.actionType) {

      case UsersConstants.EDIT_USER_AUTHS:
        _editUserAuths = action.data;
        UsersStore.emitChange();
        break;

      case UsersConstants.DELETE_USER:
        _error = {userMsg: 'Successfully deleted: ' + _deleteUser.name};
        _deleteUser = false;
        UsersStore.refreshUsers();
        break;

      case UsersConstants.USERS_UPDATE_FROM_SERVER:
        _users = action.data;
        UsersStore.emitChange();
        break;

      case UsersConstants.SAVE_AUTHS:
        var alert = {};
        alert[action.data.user_id] = {
          type: 'success',
          text: 'Saved authorizations'
        };
        _userAlerts = Object.assign({}, _userAlerts, alert);
        _editUserAuths = false;
        UsersStore.emitChange();
        break;

      case UsersConstants.SAVE_USER:
        _userAlerts[action.data.id] = {
          type: 'success',
          text: 'Successfully saved'
        };
        _error = false;
        _editUserState = false;
        UsersStore.refreshUsers();
        break;

      case SessionConstants.SESSION_UPDATE_FROM_SERVER:
        UsersStore.refreshUsers();
        break;
      default:
    }
  }
  //==============
  // ERROR_RESPONSE
  //
  else if(payload.source === AppDispatcher.ERROR_RESPONSE) {
    switch (action.actionType) {
      case UsersConstants.SAVE_USER:
        var error = Object.assign({}, action);
        error.userMsg = 'Could not save user: ' + error.status;
        UsersStore.setError(error);
        break;
    }
  }
});

module.exports = UsersStore;
