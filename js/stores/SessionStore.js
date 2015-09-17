'use strict';

var assign = require('object-assign');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var SessionDAO = require('../dao/SessionDAO');
var SessionConstants = require('../constants/SessionConstants');
var StoreListenBase = require('./StoreListenBase');
var PromiseHandlers = require('./PromiseHandlers');

var _session = false;

var SessionStore = assign({}, StoreListenBase, {
  getSession: function() {
    if (!_session) {
      var actionType = SessionConstants.SESSION_UPDATE_FROM_SERVER;
      SessionDAO.getSession()
        .then(PromiseHandlers.handleSuccess.bind(null, actionType))
        .catch(PromiseHandlers.handleNotFound.bind(null, {}, actionType));
    }
    return _session;
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  var actionType;
  switch (action.actionType) {
    case SessionConstants.SESSION_UPDATE_FROM_SERVER:
      _session = action.data;
      SessionStore.emitChange();
      break;
    case SessionConstants.LOGIN:
      actionType = SessionConstants.SESSION_UPDATE_FROM_SERVER;
      SessionDAO.login(action.credentials)
        .then(PromiseHandlers.handleSuccess.bind(null, actionType))
        .catch(PromiseHandlers.handleNotFound.bind(null, {}, actionType));
      break;
    case SessionConstants.LOGOUT:
      actionType = SessionConstants.SESSION_UPDATE_FROM_SERVER;
      SessionDAO.logout()
        .then(PromiseHandlers.handleSuccess.bind(null, actionType))
        .catch(PromiseHandlers.handleNotFound.bind(null, {}, actionType));
      break;
    default:
  }
});

module.exports = SessionStore;
