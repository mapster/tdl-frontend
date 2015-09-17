'use strict';

var assign = require('object-assign');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserDAO = require('../dao/UserDAO');
var SessionConstants = require('../constants/SessionConstants');
var UserConstants = require('../constants/UserConstants');
var StoreListenBase = require('./StoreListenBase');
var PromiseHandlers = require('./PromiseHandlers');

var _user = false;
var _auth = false;

var UserStore = assign({}, StoreListenBase, {
  getUser: function() {
    if (!_user) {
      this.refreshUser();
    }
    return _user;
  },
  getAuth: function() {
    if (!_auth) {
      this.refreshAuth();
    }
    return _auth;
  },
  refreshUser: function() {
    var actionType = UserConstants.USER_UPDATE_FROM_SERVER;
    UserDAO.getUser()
      .then(PromiseHandlers.handleSuccess.bind(null, actionType))
      .catch(PromiseHandlers.handleNotFound.bind(null, {}, actionType));
  },
  refreshAuth: function() {
    var actionType = UserConstants.USER_AUTH_UPDATE_FROM_SERVER;
    UserDAO.getAuth()
      .then(PromiseHandlers.handleSuccess.bind(null, actionType))
      .catch(PromiseHandlers.handleNotFound.bind(null, {}, actionType));
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.actionType) {
    case UserConstants.USER_UPDATE_FROM_SERVER:
      _user = action.data;
      UserStore.emitChange();
      break;
    case UserConstants.USER_AUTH_UPDATE_FROM_SERVER:
      _auth = action.data;
      UserStore.emitChange();
      break;
    case SessionConstants.SESSION_UPDATE_FROM_SERVER:
      _user = _auth = false;
      UserStore.getUser();
      UserStore.getAuth();
      break;
    default:
  }
});

module.exports = UserStore;
