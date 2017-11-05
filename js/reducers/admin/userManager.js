import * as type from '../../constants/actionTypes';
import createReducer from '../lib/createReducer';
import authorizations from '../../constants/authorizations';

const initialState = {
  users: [],
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

const reducers = {
  [type.USER_MANAGER_USERS_UPDATE_FROM_SERVER]: usersUpdateFromServer,
  [type.USER_MANAGER_USER_AUTHORIZATION_UPDATE_FROM_SERVER]: userAuthorizationUpdateFromServer,
};

export const SELECTORS = {
  getUsers: state => state.userManager.users,
};

export default createReducer(initialState, reducers);