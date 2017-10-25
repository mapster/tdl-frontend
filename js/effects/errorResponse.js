import {put, select, fork} from 'redux-saga/effects';
import * as Notification from '../actions/notification';
import {SELECTORS} from '../reducers';
import * as Action from '../actions/session';

function* handleNotLoggedIn() {
    yield put(Notification.error('Not logged in'));
    const from = yield select(SELECTORS.router.getLocation);
    yield put(Action.redirectToLogin(from));
}

export default function handleErrorResponse(status, data = '') {
  switch (status) {
    case 400: return put(Notification.error('Bad request: ' + data));
    case 401: return fork(handleNotLoggedIn);
    case 403: return put(Notification.error('Forbidden'));
    case 500: return put(Notification.error('Internal server error'));
    default: return put(Notification.error('Unknown error code: ' + status));
  }
}