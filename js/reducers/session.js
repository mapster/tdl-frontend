import {matchPath} from 'react-router-dom';

import * as type from '../constants/actionTypes';
import createReducer from './createReducer';
import * as ROUTE from '../routes';

const initialState = {
  user: null,
  auth: null,
  redirectFrom: {pathname: ROUTE.home()},
};

const sessionUpdate = (state, action) => ({
  ...state,
  user: action.data,
});

const authUpdate = (state, action) => ({
  ...state,
  auth: action.data,
});

const redirectToLogin = (state, {data: from}) => {
  if (matchPath(from.pathname, ROUTE.login.matcher)) {
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

export const SELECTORS = {
 getSession: (state) => state.session.user,
 getAuth: (state) => state.session.auth,
 getRedirectFrom: (state) => state.session.redirectFrom,
}

export default createReducer(initialState, reducers);