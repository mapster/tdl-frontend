import {put, takeEvery} from 'redux-saga/effects';
import * as type from '../constants/actionTypes';

function* putConfirmedAction({data: action}) {
  yield put(action);
}

export default function* confirmationEffects() {
  yield takeEvery(type.CONFIRMATION_CONFIRM, putConfirmedAction);
}