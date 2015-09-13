'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var SessionConstants = require('../constants/SessionConstants');

var SessionActions = {
  login: function(email, password) {
    AppDispatcher.handleViewAction({
      actionType: SessionConstants.LOGIN,
      credentials: {email: email, password: password}
    });
  },
  logout: function() {
    AppDispatcher.handleViewAction({
      actionType: SessionConstants.LOGOUT
    });
  }
};

module.exports = SessionActions;
