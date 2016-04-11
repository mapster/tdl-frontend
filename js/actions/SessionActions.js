var Constants = require('../constants/Constants');
var SessionDAO = require('../dao/SessionDAO');
var PromiseHandlers = require('../stores/PromiseHandlers');

var SessionActions = {
  login: function(email, password) {
    var actionType = Constants.SESSION_UPDATE;
    PromiseHandlers.handlePromise(SessionDAO.login({email, password}), {
      actionType
    }, {
      actionType,
      404: 'Invalid email/password combination'
    });
  },
  logout: function() {
    var actionType = Constants.SESSION_UPDATE;
    PromiseHandlers.handlePromise(SessionDAO.logout(), {
      actionType
    }, {
      actionType
    });
  }
};

module.exports = SessionActions;
