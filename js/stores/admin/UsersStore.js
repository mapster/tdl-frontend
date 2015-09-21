'use strict';

var assign = require('object-assign');

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var UsersDAO = require('../../dao/admin/UsersDAO');
var UsersConstants = require('../../constants/admin/UsersConstants');
var SessionConstants = require('../../constants/SessionConstants');
var StoreListenBase = require('../StoreListenBase');
var PromiseHandlers = require('../PromiseHandlers');

var _users = false;
var _editUser = false;
var _error = false;
var _deleteUser = false;
var _userAlerts = [];
var _showAddUserForm = false;

var UsersStore = assign({}, StoreListenBase, {
  getUsers: function() {
    if (!_users) {
      this.refreshUsers();
    }
    return _users;
  },
  getEditUser: function() {
    return _editUser;
  },
  getDeleteUser: function() {
    return _deleteUser;
  },
  showAddUserForm: function() {
    return _showAddUserForm;
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
      case UsersConstants.CONFIRM_USER_DELETE:
        UsersDAO.deleteUser(_deleteUser.id)
          .then(function() {
            _deleteUser = false;
            UsersStore.refreshUsers();
          })
          .catch(PromiseHandlers.handleError.bind(null, (e) => UsersStore.setError(e)));
        break;
      case UsersConstants.EDIT_USER:
        _editUser = action.data;
        UsersStore.emitChange();
        break;
      case UsersConstants.CLOSE_EDIT_USER:
        _editUser = false;
        _error = false;
        UsersStore.emitChange();
        break;
      case UsersConstants.SAVE_USER:
        UsersDAO.putUser(action.id, action.data)
          .then(function() {
            _userAlerts[action.id] = {
              type: 'success',
              text: 'Successfully updated.'
            };
            PromiseHandlers.handleSuccess(UsersConstants.SAVE_USER, action.id);
            _editUser = false;
            UsersStore.refreshUsers();
          })
          .catch(PromiseHandlers.handleError.bind(null, (e) => UsersStore.setError(e)));
        break;
      case UsersConstants.SHOW_ADD_USER_FORM:
        _showAddUserForm = action.data;
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
            _showAddUserForm = false;
            UsersStore.refreshUsers();
          })
          .catch(PromiseHandlers.handleError.bind(null, (e) => UsersStore.setError(e)));
        break;
      case UsersConstants.DISMISS_ERROR:
        UsersStore.setError(false);
        break;
      case UsersConstants.DISMISS_USER_ALERT:
        _userAlerts[action.id] = false;
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
      case UsersConstants.USERS_UPDATE_FROM_SERVER:
        _users = action.data;
        UsersStore.emitChange();
        break;
      case SessionConstants.SESSION_UPDATE_FROM_SERVER:
        UsersStore.refreshUsers();
        break;
      default:
    }
  }
});

module.exports = UsersStore;
