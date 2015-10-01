'use strict';

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var PromiseHandlers = require('../../stores/PromiseHandlers').factory;
var handlePromise = require('../../stores/PromiseHandlers').handlePromise;
var UsersConstants = require('../../constants/admin/UsersConstants');
var UsersDAO = require('../../dao/admin/UsersDAO');

var UserAdminActions = {
  confirmUserDelete: function(user) {
    var callbacks = [this.setDeleteUser.bind(null, false)];
    handlePromise(
      UsersDAO.deleteUser(user.id), {
        default: 'Successfully deleted user: '+user.name,
        actionType: UsersConstants.DELETE_USER,
        callbacks
      },{
        403: 'Not authorized to delete user: '+user.name,
        404: 'Could not delete non-existing user',
        default: 'Something went wrong while deleting user.',
        callbacks
      });
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
      handlePromise(UsersDAO.getAuth(userId), {actionType},{
        403: 'Not authorized to fetch user authorizations',
        404: AppDispatcher.handleStoreRefreshAction.bind(null, {actionType, data: {user_id: userId}}),
        default: 'Something went wrong when fetching user authorizations'
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
    handlePromise(UsersDAO.putAuths(userId, auth), {actionType}, {
      400: ['Invalid data in the payload to save authorizations'],
      403: 'Not authorized to save user authorizations',
      default: 'Something went wrong when saving the user authorizations'
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
