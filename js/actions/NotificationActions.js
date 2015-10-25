'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var NotificationActions = {
  dismissNotification: function() {
    AppDispatcher.handleViewAction({
      actionType: Constants.NOTIFICATION,
      data: false
    });
  },
  dispatchNotification: function(text, type) {
    AppDispatcher.handleStoreRefreshAction({
      actionType: Constants.NOTIFICATION,
      data: {text, type}
    });
  }
};

module.exports = NotificationActions;
