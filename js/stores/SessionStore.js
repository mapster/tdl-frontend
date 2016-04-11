'use strict';

var assign = require('object-assign');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var SessionDAO = require('../dao/SessionDAO');
var Constants = require('../constants/Constants');
var UsersConstants = require('../constants/admin/UsersConstants');
var StoreListenBase = require('./StoreListenBase');
var PromiseHandlers = require('./PromiseHandlers');

var _session = false;

var SessionStore = assign({}, StoreListenBase, {
  getSession: function() {
    if (!_session) {
      _session = {};
      this.refreshSession();
    }
    return _session;
  },
  refreshSession: function() {
    var actionType = Constants.SESSION_UPDATE;
    PromiseHandlers.handlePromise(SessionDAO.getSession(), {actionType}, {});
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  //==========
  // Store refresh
  //
  if(payload.source == AppDispatcher.STORE_REFRESH) {
    switch (action.actionType) {
      case Constants.SESSION_UPDATE:
        _session = action.data;
        SessionStore.emitChange();
        break;
      case UsersConstants.SAVE_USER:
        if(action.data.id == _session.id) {
          SessionStore.refreshSession();
        }
        break;
      default:
    }
  }
  //==========
  // Server action
  //
  else if(payload.source == AppDispatcher.SERVER_ACTION) {
    switch (action.actionType) {
      default:
    }
  }
});

module.exports = SessionStore;
