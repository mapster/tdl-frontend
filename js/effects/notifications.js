import {put, takeEvery} from 'redux-saga/effects';
import * as type from '../constants/actionTypes';
import {delay} from 'redux-saga';
import * as Action from '../actions/notification';

const NOTIFICATION_DISMISS_TIMOUT = 10000;

function* dismissTimeout({data: notification}) {
  yield delay(NOTIFICATION_DISMISS_TIMOUT);
  yield put(Action.dismissNotification(notification));
}

export default function* notificationEffects() {
  yield takeEvery(type.NOTIFICATION, dismissTimeout);
}