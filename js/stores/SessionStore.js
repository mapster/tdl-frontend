'use strict';

var assign = require('object-assign');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var SessionDAO = require('../dao/SessionDAO');
var SessionConstants = require('../constants/SessionConstants');
var StoreListenBase = require('./StoreListenBase');

var _session = false;

var SessionStore = assign({}, StoreListenBase, {
  getSession: function() {
    if (!_session) {
      SessionDAO.getSession().then(_updateFromServer).catch(_updateFromServerError);
    }
    return _session;
  }
});

function _updateFromServer(response) {
  AppDispatcher.handleStoreRefreshAction({
    actionType: SessionConstants.SESSION_UPDATE_FROM_SERVER,
    data: response
  });
}

function _updateFromServerError(response) {
  if (response.status == 404) {
    AppDispatcher.handleStoreRefreshAction({
      actionType: SessionConstants.SESSION_UPDATE_FROM_SERVER,
      data: {}
    });
  }
}

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.actionType) {
    case SessionConstants.SESSION_UPDATE_FROM_SERVER:
      _session = action.data;
      SessionStore.emitChange();
      break;
    case SessionConstants.LOGIN:
      SessionDAO.login(action.credentials).then(_updateFromServer).catch(_updateFromServerError);
      break;
    case SessionConstants.LOGOUT:
      SessionDAO.logout().then(_updateFromServer).catch(_updateFromServerError);
      break;
    default:
  }
});

module.exports = SessionStore;
