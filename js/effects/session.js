import {call, put, takeLatest} from 'redux-saga/effects';
import * as type from '../constants/actionTypes';
import * as Api from '../api/session';

function* login(action) {
  const {username, password} = action.data;
  try {
    const session = yield call(Api.login, username, password);
    yield put({
      type: type.SESSION_UPDATE,
      data: session.data
    });
  } catch (e) {
    // TODO: Handle 404 - Invalid email/password combination
  }
}

function* logout() {
  try {
    yield call(Api.logout);
    yield put({
      type: type.SESSION_UPDATE,
      data: null
    });
  } catch (e) {
    // TODO: Handle errors
  }
}

function* getSession() {
  try {
    const session = yield call(Api.getSession);
    yield put({
      type: type.SESSION_UPDATE,
      data: session.data
    });
  } catch (e) {
    // TODO: Handle error
  }
}

export default function* sessionEffects() {
  yield takeLatest(type.SESSION_LOGIN, login);
  yield takeLatest(type.SESSION_LOGOUT, logout);
  yield takeLatest(type.SESSION_GET, getSession)
}
