'use strict';

var assign = require('object-assign');

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var UsersDAO = require('../../dao/admin/UsersDAO');
var UsersConstants = require('../../constants/admin/UsersConstants');
var SessionConstants = require('../../constants/SessionConstants');
var StoreListenBase = require('../StoreListenBase');
var PromiseHandlers = require('../PromiseHandlers');

var USER_AUTHORIZATIONS_DEFAULT = {
  manage_exercises: false,
  manage_authorizations: false,
  manage_users: false
};

var _users = false;
var _editUserState = false;
var _editUserAuths = false;
var _error = false;
var _deleteUser = false;
var _userAlerts = {};

var UsersStore = assign({}, StoreListenBase, {
  getUsers: function() {
    if (!_users) {
      _users = [];
      this.refreshUsers();
    }
    return _users;
  },
  getEditUserState: function() {
    return _editUserState;
  },
  getEditUserAuths: function() {
    return _editUserAuths;
  },
  getDeleteUser: function() {
    return _deleteUser;
  },
  getError: function() {
    return _error;
  },
  getUserAlerts: function() {
    return _userAlerts;
  },
  // state changes (setters)
  refreshUsers: function() {
    var actionType = UsersConstants.USERS_UPDATE_FROM_SERVER;
    UsersDAO.getUsers()
      .then(PromiseHandlers.handleSuccess.bind(null, actionType))
      .catch(PromiseHandlers.handleNotFound.bind(null, [], actionType));
  },
  setError: function(error) {
    _error = error;
    this.emitChange();
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  if(payload.source == AppDispatcher.VIEW_ACTION) {
    switch (action.actionType) {
      case UsersConstants.SET_DELETE_USER:
        _deleteUser = action.data;
        UsersStore.emitChange();
        break;
      case UsersConstants.CONFIRM_DELETE_USER:
        UsersDAO.deleteUser(_deleteUser.id)
          .then(function() {
            _deleteUser = false;
            UsersStore.refreshUsers();
          })
          .catch(PromiseHandlers.handleError.bind(null, (e) => UsersStore.setError(e)));
        break;
      case UsersConstants.EDIT_USER:
        _editUserState = action.data;
        UsersStore.emitChange();
        break;
      case UsersConstants.CLOSE_EDIT_USER:
        _editUserState = false;
        _error = false;
        UsersStore.emitChange();
        break;
      case UsersConstants.ADD_USER:
        UsersDAO.postUser(action.data)
          .then(function(response) {
            _userAlerts[response.id] = {
              type: 'success',
              text: 'Successfully added.'
            };
            PromiseHandlers.handleSuccess(UsersConstants.ADD_USER, response);
            UsersStore.refreshUsers();
          })
          .catch(PromiseHandlers.handleError.bind(null, (e) => UsersStore.setError(e)));
        break;
      case UsersConstants.EDIT_USER_AUTHS:
        if(!action.data){
          _editUserAuths = false;
          UsersStore.emitChange();
        }
        else {
          var actionType = UsersConstants.EDIT_USER_AUTHS;
          UsersDAO.getAuth(action.data)
            .then(PromiseHandlers.handleSuccess.bind(null, actionType))
            .catch(PromiseHandlers.handleNotFound.bind(null, assign({user_id: action.data}, USER_AUTHORIZATIONS_DEFAULT), actionType));
        }
        break;
      case UsersConstants.SAVE_AUTHS:
        UsersDAO.putAuths(_editUserAuths.user_id, action.data)
          .then(function(response) {
            _userAlerts[response.user_id] = {
              type: 'success',
              text: 'Saved authorizations'
            };
            PromiseHandlers.handleSuccess(UsersConstants.SAVE_AUTHS, response);
            _editUserAuths = false;
            UsersStore.emitChange();
          })
          .catch(PromiseHandlers.handleError.bind(null, (e) => UsersStore.setError(e)));
        break;
      case UsersConstants.DISMISS_ALERT:
        UsersStore.setError(false);
        break;
      case UsersConstants.DISMISS_USER_ALERT:
        var change = Object.assign({}, _userAlerts);
        change[action.id] = false;
        _userAlerts = change;
        UsersStore.emitChange();
        break;
      default:
    }
  }
  //==============
  // STORE_REFRESH
  //
  else if(payload.source == AppDispatcher.STORE_REFRESH){
    switch (action.actionType) {
      case UsersConstants.EDIT_USER_AUTHS:
        _editUserAuths = action.data;
        UsersStore.emitChange();
        break;
      case UsersConstants.USERS_UPDATE_FROM_SERVER:
        _users = action.data;
        UsersStore.emitChange();
        break;
      case UsersConstants.SAVE_USER:
        _userAlerts[action.data.id] = {
          type: 'success',
          text: 'Successfully updated.'
        };
        _error = false;
        _editUserState = false;
        UsersStore.refreshUsers();
        break;
      case SessionConstants.SESSION_UPDATE_FROM_SERVER:
        UsersStore.refreshUsers();
        break;
      default:
    }
  }
  //==============
  // ERROR_RESPONSE
  //
  else if(payload.source === AppDispatcher.ERROR_RESPONSE) {
    switch (action.actionType) {
      case UsersConstants.SAVE_USER:
        var error = Object.assign({}, action);
        error.userMsg = 'Could not save user: ' + error.status;
        UsersStore.setError(error);
        break;
    }
  }
});

module.exports = UsersStore;
