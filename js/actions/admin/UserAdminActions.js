'use strict';

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var PromiseHandlers = require('../../stores/PromiseHandlers').factory;
var UsersConstants = require('../../constants/admin/UsersConstants');
var UsersDAO = require('../../dao/admin/UsersDAO');

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
      actionType: UsersConstants.CONFIRM_DELETE_USER});
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
  setEditUserState: function(user) {
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
    var doThen = PromiseHandlers.handleSuccess(UsersConstants.SAVE_USER);
    var doCatch = PromiseHandlers.handleErrorResponse(UsersConstants.SAVE_USER);
    if(id === undefined){
      UsersDAO.postUser(user).then(doThen).catch(doCatch);
    } else {
      UsersDAO.putUser(id, user).then(doThen).catch(doCatch);
    }
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
  }
};

module.exports = UserAdminActions;
