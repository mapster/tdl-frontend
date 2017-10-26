import {put, select, call} from 'redux-saga/effects';
import * as Notification from '../actions/notification';
import {SELECTORS} from '../reducers';
import * as Action from '../actions/session';
import NotLoggedInException from './NotLoggedInException';
import {matchPath} from 'react-router-dom';
import * as ROUTE from '../routes';

function* handleNotLoggedIn() {
    const from = yield select(SELECTORS.router.getLocation);
    if (!matchPath(from.pathname, ROUTE.login.matcher)) {
      yield put(Notification.error('Not logged in'));
      yield put(Action.redirectToLogin(from));
    }

    return new NotLoggedInException();
}

export default function handleErrorResponse(status, data = '') {
  switch (status) {
    case 400: return put(Notification.error('Bad request: ' + data));
    case 401: return call(handleNotLoggedIn);
    case 403: return put(Notification.error('Forbidden'));
    case 500: return put(Notification.error('Internal server error'));
    default:
      console.warn(`Unhandled error: ${status} - ${data}`);
      return;
  }
}