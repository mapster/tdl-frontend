'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var SessionConstants = require('../constants/SessionConstants');

var SessionActions = {
  logout: function() {
    AppDispatcher.handleViewAction({
      actionType: SessionConstants.LOGOUT
    });
  }
};

module.exports = SessionActions;
