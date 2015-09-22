'use strict';

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var UsersConstants = require('../../constants/admin/UsersConstants');

var UserAdminActions = {
  addUser: function(user) {
    AppDispatcher.handleViewAction({
      actionType: UsersConstants.ADD_USER,
      data: user
    });
  },
  closeEditUser: function() {
    AppDispatcher.handleViewAction({
      actionType: UsersConstants.CLOSE_EDIT_USER
    });
  },
  confirmUserDelete: function() {
    AppDispatcher.handleViewAction({
      actionType: UsersConstants.CONFIRM_USER_DELETE
    });
  },
  dismissError: function() {
    AppDispatcher.handleViewAction({
      actionType: UsersConstants.DISMISS_ERROR
    });
  },
  dismissUserAlert: function(userId) {
    AppDispatcher.handleViewAction({
      actionType: UsersConstants.DISMISS_USER_ALERT,
      id: userId
    });
  },
  editUser: function(user) {
    AppDispatcher.handleViewAction({
      actionType: UsersConstants.EDIT_USER,
      data: user
    });
  },
  editUserAuths: function(userId) {
    AppDispatcher.handleViewAction({
      actionType: UsersConstants.EDIT_USER_AUTHS,
      data: userId
    });
  },
  saveUser: function(id, user) {
    AppDispatcher.handleViewAction({
      actionType: UsersConstants.SAVE_USER,
      data: user,
      id: id
    });
  },
  saveUserAuths: function(auth) {
    AppDispatcher.handleViewAction({
      actionType: UsersConstants.SAVE_AUTHS,
      data: auth
    });
  },
  setDeleteUser: function(user) {
    AppDispatcher.handleViewAction({
      actionType: UsersConstants.SET_DELETE_USER,
      data: user
    });
  },
  showAddUserForm: function(doShow) {
    AppDispatcher.handleViewAction({
      actionType: UsersConstants.SHOW_ADD_USER_FORM,
      data: doShow
    });
  }
};

module.exports = UserAdminActions;
