import {put, call, takeLatest} from 'redux-saga/effects';
import {push} from 'connected-react-router';

import * as type from '../constants/actionTypes';
import * as Api from '../api/users';
import * as Action from '../actions/register';
import handleErrorResponse from './errorResponse';
import * as Notification from '../actions/notification';
import * as ROUTE from '../routes';

function* submitRegistration({data: registration}) {
  try {
    yield call(Api.createUser, registration);
    yield put(Notification.success('Successfully registered'));
    yield put(Action.resetRegistration())
    yield put(push(ROUTE.login()));
  } catch (e) {
    const {status, data} = e.response;

    if(status === 400) {
      yield put(Action.setRegistrationFeedback(data));
    } else {
      handleErrorResponse(status, data);
    }
  }
}

export default function* registerEffects() {
  yield takeLatest(type.REGISTER_SUBMIT, submitRegistration);
}