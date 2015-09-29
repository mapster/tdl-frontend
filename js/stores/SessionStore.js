'use strict';

var assign = require('object-assign');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var SessionDAO = require('../dao/SessionDAO');
var SessionConstants = require('../constants/SessionConstants');
var UsersConstants = require('../constants/admin/UsersConstants');
var StoreListenBase = require('./StoreListenBase');
var PromiseHandlers = require('./PromiseHandlers');

var _session = false;

var SessionStore = assign({}, StoreListenBase, {
  getSession: function() {
    if (!_session) {
      this.refreshSession();
    }
    return _session;
  },
  refreshSession: function() {
    var actionType = SessionConstants.SESSION_UPDATE_FROM_SERVER;
    SessionDAO.getSession()
      .then(PromiseHandlers.handleSuccess.bind(null, actionType))
      .catch(PromiseHandlers.handleNotFound.bind(null, {}, actionType));
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  //============
  // View action
  //
  if(payload.source == AppDispatcher.VIEW_ACTION) {
  }
  //==========
  // Store refresh
  //
  else if(payload.source == AppDispatcher.STORE_REFRESH) {
    switch (action.actionType) {
      case SessionConstants.SESSION_UPDATE_FROM_SERVER:
        _session = action.data;
        SessionStore.emitChange();
        break;
      default:
    }
  }
  //==========
  // Server action
  //
  else if(payload.source == AppDispatcher.SERVER_ACTION) {
    switch (action.actionType) {
      case UsersConstants.SAVE_USER:
        if(action.id == _session.id) {
          SessionStore.refreshSession();
        }
        break;
      default:
    }
  }
});

module.exports = SessionStore;
