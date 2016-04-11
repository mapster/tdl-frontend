var assign = require('object-assign');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserDAO = require('../dao/UserDAO');
var Constants = require('../constants/Constants');
var StoreListenBase = require('./StoreListenBase');
var PromiseHandlers = require('./PromiseHandlers');

var _user = false;
var _auth = false;

var UserStore = assign({}, StoreListenBase, {
  getUser: function() {
    if (!_user) {
      _user = {};
      this.refreshUser();
    }
    return _user;
  },
  getAuth: function() {
    if (!_auth) {
      _auth = {};
      this.refreshAuth();
    }
    return _auth;
  },
  refreshUser: function() {
    var actionType = Constants.USER_UPDATE;
    PromiseHandlers.handlePromise(UserDAO.getUser(), {actionType}, {});
  },
  refreshAuth: function() {
    var actionType = Constants.USER_AUTH_UPDATE;
    PromiseHandlers.handlePromise(UserDAO.getAuth(), {actionType}, {});
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.actionType) {
    case Constants.USER_UPDATE:
      _user = action.data;
      UserStore.emitChange();
      break;
    case Constants.USER_AUTH_UPDATE:
      _auth = action.data;
      UserStore.emitChange();
      break;
    case Constants.SESSION_UPDATE:
      _user = _auth = false;
      UserStore.getUser();
      UserStore.getAuth();
      break;
    default:
  }
});

module.exports = UserStore;
