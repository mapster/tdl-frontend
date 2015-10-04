'use strict';

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ConfirmationActions = require('../ConfirmationActions');
var handlePromise = require('../../stores/PromiseHandlers').handlePromise;
var UsersConstants = require('../../constants/admin/UsersConstants');
var UsersDAO = require('../../dao/admin/UsersDAO');

function _updateEditUserState(state) {
  AppDispatcher.handleViewAction({
    actionType: UsersConstants.UPDATE_EDIT_USER_STATE,
    data: state
  });
}

function _setUserFormAlert(msg, type) {
  var alert = false;
  if(msg){
    type = type || 'default';
    alert = {text: msg, type};
  }
  _updateEditUserState({alert});
}

function _setUserAlert(userId, msg) {
  var change = {};
  change[userId] = false;
  if(msg) {
    change[userId] = {text: msg, type: 'success'};
  }
  AppDispatcher.handleStoreRefreshAction({
    actionType: UsersConstants.UPDATE_USER_ALERTS,
    data: change
  });
}

var UserAdminActions = {
  closeAuthsForm: function() {
    AppDispatcher.handleStoreRefreshAction({
      actionType: UsersConstants.EDIT_USER_AUTHS,
      data: false
    });
  },
  closeUserForm: function() {
    _updateEditUserState({user: false, alert: false});
  },
  deleteUser: function(user) {
    var todoConfirm = function() {
      handlePromise(
        UsersDAO.deleteUser(user.id), {
          default: 'Successfully deleted user: '+user.name,
          actionType: UsersConstants.DELETE_USER
        },{
          403: 'Not authorized to delete user: '+user.name,
          404: 'Could not delete non-existing user',
          default: 'Something went wrong while deleting user.'
        }
      );
    };
    ConfirmationActions.confirmAndInvoke('Are you sure you wish to delete this user?', todoConfirm);
  },
  dismissAlert: function() {
    _setUserFormAlert(false);
  },
  dismissUserAlert: function(userId) {
    _setUserAlert(userId, false);
  },
  editUser: function(user) {
    _updateEditUserState({title: 'Edit user', user, feedback: {}, alert: false});
  },
  editUserAuths: function(userId) {
    var actionType = UsersConstants.EDIT_USER_AUTHS;

    handlePromise(UsersDAO.getAuth(userId), {
      actionType
    },{
      403: 'Not authorized to fetch user authorizations',
      404: () => AppDispatcher.handleStoreRefreshAction({actionType, data: {user_id: userId}}),
      default: 'Something went wrong when fetching user authorizations'
    });
  },
  newUser: function() {
    _updateEditUserState({title: 'New user', user: {}, feedback: {}});
  },
  saveUser: function(id, user) {
    var actionType = UsersConstants.SAVE_USER;
    var promise = (id === undefined) ? promise = UsersDAO.postUser(user) : UsersDAO.putUser(id, user);

    handlePromise(promise, {
      actionType,
      callbacks: [UserAdminActions.closeUserForm, () => _setUserAlert(id, 'Successfully saved')]
    }, {
      400: (r) => _updateEditUserState({feedback: JSON.parse(r)}),
      403: () => _setUserFormAlert('Not authorized to update user: '+user.name, 'danger'),
      404: () => _setUserFormAlert('The user does not exist: '+user.name, 'danger'),
      default: () => _setUserFormAlert('Something went wrong when saving user: '+user.name, 'danger')
    });
  },
  saveUserAuths: function(userId, auth) {
    var actionType = UsersConstants.SAVE_AUTHS;
    handlePromise(UsersDAO.putAuths(userId, auth), {
      actionType,
      callbacks: [UserAdminActions.closeAuthsForm, () => _setUserAlert(userId, 'Saved authorizations')]
    }, {
      400: 'Invalid data in the payload to save authorizations',
      403: 'Not authorized to save user authorizations',
      default: 'Something went wrong when saving the user authorizations',
      callbacks: [UserAdminActions.closeAuthsForm]
    });
  },
  updateUserForm: function(user) {
    _updateEditUserState({user});
  }
};

module.exports = UserAdminActions;
