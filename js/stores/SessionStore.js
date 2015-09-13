'use strict';

var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var SessionDAO = require('../dao/SessionDAO');
var SessionConstants = require('../constants/SessionConstants');

var CHANGE_EVENT = 'change';

var _session = false;

var SessionStore = assign({}, EventEmitter.prototype, {
  getSession: function() {
    if (!_session) {
      SessionDAO.getSession().then(_updateFromServer).catch(_updateFromServerError);
    }
    return _session;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

function _updateFromServer(response) {
  AppDispatcher.handleStoreRefreshAction({
    actionType: SessionConstants.UPDATE_SESSION_FROM_SERVER,
    data: response
  });
}

function _updateFromServerError(response) {
  if (response.status == 404) {
    AppDispatcher.handleStoreRefreshAction({
      actionType: SessionConstants.UPDATE_SESSION_FROM_SERVER,
      data: {}
    });
  }
}

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.actionType) {
    case SessionConstants.UPDATE_SESSION_FROM_SERVER:
      _session = action.data;
      SessionStore.emitChange();
      break;
    case SessionConstants.LOGOUT:
      SessionDAO.logout().then(_updateFromServer);
      break;
    default:
  }
});

module.exports = SessionStore;
