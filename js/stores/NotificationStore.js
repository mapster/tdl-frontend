'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var StoreListenBase = require('./StoreListenBase');

var _notification = false;

var NotificationStore = Object.assign({}, StoreListenBase, {
  getNotification: function() {
    return _notification;
  },
  setNotification: function(note) {
    _notification = note;
    this.emitChange();
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  if(action.actionType === Constants.NOTIFICATION) {
    NotificationStore.setNotification(action.data);
  }
});

module.exports = NotificationStore;
