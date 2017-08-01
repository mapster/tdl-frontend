import {call, put, takeLatest, select, fork} from 'redux-saga/effects';
import * as type from '../constants/actionTypes';
import * as Api from '../api/session';
import * as Action from '../actions/session';
import {SELECTORS} from '../reducers/index';
import * as ROUTE from '../routes';
import {push} from 'connected-react-router';

function* login(action) {
  const {username, password} = action.data;
  try {
    const session = yield call(Api.login, username, password);
    yield put(Action.sessionUpdate(session.data));
  } catch (e) {
    // TODO: Handle 404 - Invalid email/password combination
  }
}

function* logout() {
  try {
    yield call(Api.logout);
    yield put(Action.sessionUpdate(null));
  } catch (e) {
    // TODO: Handle errors
  }
}

function* getSession() {
  try {
    const session = yield call(Api.getSession);
    yield put(Action.sessionUpdate(session.data));
  } catch (e) {
    // TODO: Handle error
  }
}

function* getAuth() {
  try {
    const auth = yield call(Api.getAuth);
    yield put(Action.authUpdate(auth.data));
  } catch (e) {
    // TODO: Handle error
  }
}

function* sessionUpdate({data: session}) {
  if (session && session.name) {
    yield fork(getAuth);
    const redirectFrom = yield select(SELECTORS.session.getRedirectFrom);
    yield put(push(redirectFrom.pathname));
  } else {
    const from = yield select(SELECTORS.router.getLocation);
    yield put(Action.redirectToLogin(from))
  }
}

function* redirectToLogin() {
  yield put(push(ROUTE.login));
}

// TODO: the store had a refreshSession trigger for UserConstants.SAVE_USER

export default function* sessionEffects() {
  yield takeLatest(type.SESSION_LOGIN, login);
  yield takeLatest(type.SESSION_LOGOUT, logout);
  yield takeLatest([type.SESSION_GET, type.INIT], getSession);
  yield takeLatest(type.SESSION_UPDATE, sessionUpdate);
  yield takeLatest(type.SESSION_REDIRECT_TO_LOGIN, redirectToLogin);
}
