'use strict';

var assign = require('object-assign');

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var UsersDAO = require('../../dao/admin/UsersDAO');
var UsersConstants = require('../../constants/admin/UsersConstants');
var Constants = require('../../constants/Constants');
var StoreListenBase = require('../StoreListenBase');
var PromiseHandlers = require('../PromiseHandlers');

var _users = false;
var _editUserState = false;
var _editUserAuths = false;
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
  getUserAlerts: function() {
    return _userAlerts;
  },
  // state changes (setters)
  refreshUsers: function() {
    var actionType = UsersConstants.USERS_UPDATE_FROM_SERVER;
    PromiseHandlers.handlePromise(UsersDAO.getUsers(), {actionType}, {actionType});
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  if(payload.source == AppDispatcher.VIEW_ACTION) {
    switch (action.actionType) {
      case UsersConstants.UPDATE_EDIT_USER_STATE:
        _editUserState = Object.assign(_editUserState, action.data);
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

      case UsersConstants.DELETE_USER:
        UsersStore.refreshUsers();
        break;

      case UsersConstants.EDIT_USER_AUTHS:
        _editUserAuths = action.data;
        UsersStore.emitChange();
        break;

      case UsersConstants.SAVE_USER:
        UsersStore.refreshUsers();
        break;

      case Constants.SESSION_UPDATE:
        UsersStore.refreshUsers();
        break;

      case UsersConstants.UPDATE_USER_ALERTS:
        _userAlerts = Object.assign({}, _userAlerts, action.data);
        UsersStore.emitChange();
        break;

      case UsersConstants.USERS_UPDATE_FROM_SERVER:
        _users = action.data;
        UsersStore.emitChange();
        break;
      default:
    }
  }
});

module.exports = UsersStore;
