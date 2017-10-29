import {call, put, takeLatest, select, fork} from 'redux-saga/effects';

import * as type from '../constants/actionTypes';
import * as SessionApi from '../api/session';
import * as UserApi from '../api/users';
import * as Action from '../actions/session';
import {SELECTORS} from '../reducers/index';
import * as ROUTE from '../routes';
import {push} from 'connected-react-router';
import {matchPath} from 'react-router-dom';
import handleErrorResponse from './errorResponse';
import * as Notification from '../actions/notification';

function* login(action) {
  const {username, password} = action.data;
  try {
    const session = yield call(SessionApi.login, username, password);
    yield put(Action.sessionUpdate(session.data));
  } catch (e) {
    const {status, data} = e.response;
    if (status === 404) {
      yield put(Notification.error('Invalid user/password combination'))
    } else {
      yield handleErrorResponse(status, data);
    }
  }
}

function* logout() {
  try {
    yield call(SessionApi.logout);
    yield put(Action.sessionUpdate(null));
  } catch (e) {
    const {status, data} = e.response;
    // We don't need to react to 404 on logout since it doesn't matter that we're already logged out
    if (status !== 404) {
      handleErrorResponse(status, data);
    }
  }
}

function* getSession() {
  try {
    const session = yield call(SessionApi.getSession);
    yield put(Action.sessionUpdate(session.data));
  } catch (e) {
    const {data, status} = e.response;
    yield handleErrorResponse(status, data);
  }
}

function* getAuth() {
  try {
    const auth = yield call(UserApi.getAuth);
    yield put(Action.authUpdate(auth.data));
  } catch (e) {
    const {data, status} = e.response;
    yield handleErrorResponse(status, data);
  }
}

function* sessionUpdate({data: session}) {
  if (session && session.name) {
    yield fork(getAuth);

    // redirect if current location is ROUTE.login
    const currentLocation = yield select(SELECTORS.router.getLocation);
    if (matchPath(currentLocation.pathname, ROUTE.login.matcher)) {
      const redirectFrom = yield select(SELECTORS.session.getRedirectFrom);
      yield put(push(redirectFrom.pathname));
    }
  } else {
    const from = yield select(SELECTORS.router.getLocation);
    yield put(Action.redirectToLogin(from))
  }
}

function* redirectToLogin() {
  yield put(push(ROUTE.login()));
}

// TODO: the store had a refreshSession trigger for UserConstants.SAVE_USER

export default function* sessionEffects() {
  yield takeLatest(type.SESSION_LOGIN, login);
  yield takeLatest(type.SESSION_LOGOUT, logout);
  yield takeLatest([type.SESSION_GET, type.INIT], getSession);
  yield takeLatest(type.SESSION_UPDATE, sessionUpdate);
  yield takeLatest(type.SESSION_REDIRECT_TO_LOGIN, redirectToLogin);
}
