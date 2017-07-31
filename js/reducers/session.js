import * as type from '../constants/actionTypes';

const initialState = {
  user: null,
  auth: null,
};

export const getSession = (state) => state.session.user;
export const getAuth = (state) => state.session.auth;

const sessionUpdate = (state, action) => ({
  ...state,
  user: action.data,
});

const authUpdate = (state, action) => ({
  ...state,
  auth: action.data,
});

const reducers = {
  [type.SESSION_UPDATE]: sessionUpdate,
  [type.SESSION_AUTH_UPDATE]: authUpdate,
};

export default function session(state = initialState, action) {
  const reducer = reducers[action.type];
  if (reducer) {
    return reducer(state, action);
  }

  return state;
}
