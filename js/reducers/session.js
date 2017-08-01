import {matchPath} from 'react-router-dom';

import * as type from '../constants/actionTypes';
import createReducer from './createReducer';
import * as ROUTE from '../routes';

const LOGIN_PATH = {
  path: ROUTE.login,
  exact: true,
  strict: false,
};

const initialState = {
  user: null,
  auth: null,
  redirectFrom: {pathname: ROUTE.home},
};

export const getSession = (state) => state.session.user;
export const getAuth = (state) => state.session.auth;
export const getRedirectFrom = (state) => state.session.redirectFrom;

const sessionUpdate = (state, action) => ({
  ...state,
  user: action.data,
});

const authUpdate = (state, action) => ({
  ...state,
  auth: action.data,
});

const redirectToLogin = (state, {data: from}) => {
  if (matchPath(from.pathname, LOGIN_PATH)) {
    from = initialState.redirectFrom;
  }
  return {
    ...state,
    redirectFrom: from,
  }
};

const reducers = {
  [type.SESSION_UPDATE]: sessionUpdate,
  [type.SESSION_AUTH_UPDATE]: authUpdate,
  [type.SESSION_REDIRECT_TO_LOGIN]: redirectToLogin,
};

export default createReducer(initialState, reducers);