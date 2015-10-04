'use strict';

// var AppDispatcher = require('../dispatcher/AppDispatcher');
var SessionConstants = require('../constants/SessionConstants');
var SessionDAO = require('../dao/SessionDAO');
var PromiseHandlers = require('../stores/PromiseHandlers');

var SessionActions = {
  login: function(email, password) {
    var actionType = SessionConstants.SESSION_UPDATE_FROM_SERVER;
    PromiseHandlers.handlePromise(SessionDAO.login({email, password}), {
      actionType
    }, {
      actionType,
      404: 'Invalid email/password combination'
    });
  },
  logout: function() {
    var actionType = SessionConstants.SESSION_UPDATE_FROM_SERVER;
    PromiseHandlers.handlePromise(SessionDAO.logout(), {
      actionType
    }, {
      actionType
    });
  }
};

module.exports = SessionActions;
