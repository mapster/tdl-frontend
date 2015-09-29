'use strict';

// var AppDispatcher = require('../dispatcher/AppDispatcher');
var SessionConstants = require('../constants/SessionConstants');
var SessionDAO = require('../dao/SessionDAO');
var PromiseHandlers = require('../stores/PromiseHandlers');

var SessionActions = {
  login: function(email, password) {
    var actionType = SessionConstants.SESSION_UPDATE_FROM_SERVER;
    SessionDAO.login({email, password})
      .then(PromiseHandlers.handleSuccess.bind(null, actionType))
      .catch(PromiseHandlers.handleNotFound.bind(null, {}, actionType));
  },
  logout: function() {
    var actionType = SessionConstants.SESSION_UPDATE_FROM_SERVER;
    SessionDAO.logout()
      .then(PromiseHandlers.handleSuccess.bind(null, actionType))
      .catch(PromiseHandlers.handleNotFound.bind(null, {}, actionType));
  }
};

module.exports = SessionActions;
