import {call, put, takeLatest} from 'redux-saga/effects';
import * as type from '../constants/actionTypes';
import * as Api from '../api/session';
import * as Action from '../actions/session';

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

// TODO: the store had a refreshSession trigger for UserConstants.SAVE_USER

export default function* sessionEffects() {
  yield takeLatest(type.SESSION_LOGIN, login);
  yield takeLatest(type.SESSION_LOGOUT, logout);
  yield takeLatest([type.SESSION_GET, type.INIT], getSession);
  yield takeLatest([type.SESSION_UPDATE], getAuth);
}
