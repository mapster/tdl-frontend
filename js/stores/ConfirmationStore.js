'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var StoreListenBase = require('./StoreListenBase');

var _state = {show: false, text: ''};

var ConfirmationStore = Object.assign({}, StoreListenBase, {
  getState: function() {
    return _state;
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  if(payload.source === AppDispatcher.VIEW_ACTION) {
    switch(action.actionType) {
      case Constants.SET_CONFIRMATION:
        _state = action.data;
        ConfirmationStore.emitChange();
        break;
      default:
    }
  }
});

module.exports = ConfirmationStore;
