'use strict';

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var PromiseHandlers = require('../../stores/PromiseHandlers').factory;
var UsersConstants = require('../../constants/admin/UsersConstants');
var UsersDAO = require('../../dao/admin/UsersDAO');

var UserAdminActions = {
  closeEditUser: function() {
    AppDispatcher.handleViewAction({
      actionType: UsersConstants.CLOSE_EDIT_USER
    });
  },
  confirmUserDelete: function() {
    AppDispatcher.handleViewAction({
      actionType: UsersConstants.CONFIRM_DELETE_USER});
  },
  dismissAlert: function() {
    AppDispatcher.handleViewAction({
      actionType: UsersConstants.DISMISS_ALERT});
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
    var actionType = UsersConstants.EDIT_USER_AUTHS;
    if(!userId){
      AppDispatcher.handleStoreRefreshAction({actionType, data: false});
    }
    else {
      UsersDAO.getAuth(userId)
        .then(PromiseHandlers.handleSuccess(actionType))
        .catch((response) => {
          if(response.status === 404) {
            AppDispatcher.handleStoreRefreshAction({actionType, data: {user_id: userId}});
          } else {
            PromiseHandlers.handleErrorResponse(actionType)(response);
          }
        });
    }
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
  saveUserAuths: function(userId, auth) {
    var actionType = UsersConstants.SAVE_AUTHS;
    UsersDAO.putAuths(userId, auth)
      .then(PromiseHandlers.handleSuccess(actionType))
      .catch(PromiseHandlers.handleErrorResponse(actionType));
  },
  setDeleteUser: function(user) {
    AppDispatcher.handleViewAction({
      actionType: UsersConstants.SET_DELETE_USER,
      data: user
    });
  }
};

module.exports = UserAdminActions;
