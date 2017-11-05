import * as type from '../../constants/actionTypes';
import {push} from 'connected-react-router';
import * as ROUTE from '../../routes';

export const usersUpdateFromServer = users => ({
  type: type.USER_MANAGER_USERS_UPDATE_FROM_SERVER,
  data: users,
});

export const getUsers = () => ({
  type: type.USER_MANAGER_GET_USERS,
});

export const saveUser = (user) => ({
  type: type.USER_MANAGER_SAVE_USER,
  data: user,
});

export const setEditUserFeedback = (feedback) => ({
  type: type.USER_MANAGER_SET_EDIT_USER_FEEDBACK,
  data: feedback,
});

export const saveUserAuthorizations = (authorizations) => ({
  type: type.USER_MANAGER_SAVE_USER_AUTHORIZATIONS,
  data: authorizations,
});

export const userAuthorizationUpdateFromServer = (authorizations) => ({
  type: type.USER_MANAGER_USER_AUTHORIZATION_UPDATE_FROM_SERVER,
  data: authorizations,
});

export const editUserUpdateFromServer = (user) => ({
  type: type.USER_MANAGER_EDIT_USER_UPDATE_FROM_SERVER,
  data: user,
});

export const editUserUpdate = (user) => ({
  type: type.USER_MANAGER_EDIT_USER_UPDATE,
  data: user,
});

export const resetEditUser = (id) => ({
  type: type.USER_MANAGER_EDIT_USER_RESET,
  data: id,
});

export const editUser = (id) => push(ROUTE.admin_users_edit({id}));