'use strict';

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var handlePromise = require('../../stores/PromiseHandlers').handlePromise;
var UsersConstants = require('../../constants/admin/UsersConstants');
var UsersDAO = require('../../dao/admin/UsersDAO');

function _updateEditUserState(state) {
  AppDispatcher.handleViewAction({
    actionType: UsersConstants.UPDATE_EDIT_USER_STATE,
    data: state
  });
}

var UserAdminActions = {
  closeUserForm: function() {
    _updateEditUserState({user: false});
  },
  confirmUserDelete: function(user) {
    var callbacks = [UserAdminActions.setDeleteUser.bind(null, false)];
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
  editUser: function(user) {
    _updateEditUserState({title: 'Edit user', user, feedback: {}});
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
  newUser: function() {
    _updateEditUserState({title: 'New user', user: {}, feedback: {}});
  },
  saveUser: function(id, user) {
    var actionType = UsersConstants.SAVE_USER;
    var promise = (id === undefined) ? promise = UsersDAO.postUser(user) : UsersDAO.putUser(id, user);

    handlePromise(promise, {
      actionType,
      default: UserAdminActions.closeUserForm.bind(null, false)
    }, {
      400: (r) => _updateEditUserState({feedback: JSON.parse(r)}),
      403: 'Not authorized to update user: '+user.name,
      404: 'The user does not exist: '+user.name,
      default: 'Something went wrong when saving user: '+user.name
    });
  },
  saveUserAuths: function(userId, auth) {
    var actionType = UsersConstants.SAVE_AUTHS;
    handlePromise(UsersDAO.putAuths(userId, auth), {actionType}, {
      400: 'Invalid data in the payload to save authorizations',
      403: 'Not authorized to save user authorizations',
      default: 'Something went wrong when saving the user authorizations'
    });
  },
  setDeleteUser: function(user) {
    AppDispatcher.handleViewAction({
      actionType: UsersConstants.SET_DELETE_USER,
      data: user
    });
  },
  updateUserForm: function(user) {
    _updateEditUserState({user});
  }
};

module.exports = UserAdminActions;
