'use strict';

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var UsersConstants = require('../../constants/admin/UsersConstants');

var UserAdminActions = {
  closeEditUser: function() {
    AppDispatcher.handleViewAction({
      actionType: UsersConstants.CLOSE_EDIT_USER
    });
  },
  editUser: function(user) {
    AppDispatcher.handleViewAction({
      actionType: UsersConstants.EDIT_USER,
      data: user
    });
  },
  saveUser: function(id, user) {
    AppDispatcher.handleViewAction({
      actionType: UsersConstants.SAVE_USER,
      data: user,
      id: id
    });
  },
  setDeleteUser: function(user) {
    AppDispatcher.handleViewAction({
      actionType: UsersConstants.SET_DELETE_USER,
      data: user
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
  }
};

module.exports = UserAdminActions;
