import * as type from '../../constants/actionTypes';
import authorizations from '../../constants/authorizations';

export const usersUpdateFromServer = users => ({
  type: type.USER_MANAGER_USERS_UPDATE_FROM_SERVER,
  data: users,
});

export const getUsers = () => ({
  type: type.USER_MANAGER_GET_USERS,
});

export const saveUserAuthorizations = (authorizations) => ({
  type: type.USER_MANAGER_SAVE_USER_AUTHORIZATIONS,
  data: authorizations,
});

export const userAuthorizationUpdateFromServer = (authorizations) => ({
  type: type.USER_MANAGER_USER_AUTHORIZATION_UPDATE_FROM_SERVER,
  data: authorizations,
});