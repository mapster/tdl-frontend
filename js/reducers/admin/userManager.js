import * as type from '../../constants/actionTypes';
import createReducer from '../lib/createReducer';

const initialState = {
  users: [],
  editUser: {},
  editUserFeedback: {},
};

const usersUpdateFromServer = (state, {data: users}) => ({
  ...state, users,
});

const userAuthorizationUpdateFromServer = (state, {data: authorizations}) => {
  const newUsers = [...state.users];
  const index = newUsers.findIndex((user) => user.id === authorizations.user_id);
  newUsers[index].user_authorization = authorizations;
  return {
    ...state,
    users: newUsers,
  };
};

const editUserUpdateFromServer = (state, {data: user}) => ({
  ...state,
  editUser: user,
  editUserFeedback: {},
});

const editUserUpdate = (state, {data: user}) => ({
  ...state,
  editUser: user,
});

const setEditUserFeedback = (state, {data: feedback}) => ({
  ...state,
  editUserFeedback: feedback,
});

const reducers = {
  [type.USER_MANAGER_USERS_UPDATE_FROM_SERVER]: usersUpdateFromServer,
  [type.USER_MANAGER_USER_AUTHORIZATION_UPDATE_FROM_SERVER]: userAuthorizationUpdateFromServer,
  [type.USER_MANAGER_EDIT_USER_UPDATE_FROM_SERVER]: editUserUpdateFromServer,
  [type.USER_MANAGER_SET_EDIT_USER_FEEDBACK]: setEditUserFeedback,
  [type.USER_MANAGER_EDIT_USER_UPDATE]: editUserUpdate,
};

export const SELECTORS = {
  getUsers: state => state.userManager.users,
  getEditUser: state => state.userManager.editUser,
  getEditUserFeedback: state => state.userManager.editUserFeedback || {},
};

export default createReducer(initialState, reducers);