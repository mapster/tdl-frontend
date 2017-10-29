import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {matchPath} from 'react-router-dom';

import * as ROUTE from '../routes';
import * as UserApi from '../api/users';
import * as Action from '../actions/editProfile';
import * as Notification from '../actions/notification';
import * as type from '../constants/actionTypes';
import handleErrorResponse from './errorResponse';

function* getProfile() {
  try {
    const profile = yield call(UserApi.getUser);
    yield put(Action.updateProfileFromServer(profile.data));
  } catch (e) {
    const {status, data} = e.response;
    yield handleErrorResponse(status, data);
  }
}

function* saveProfile({data: profile}) {
  try {
    const savedProfile = yield call(UserApi.updateUser, profile);
    yield put(Action.updateProfileFromServer(savedProfile.data));
    yield put(Notification.success('Saved profile'));
  } catch (e) {
    const {status, data} = e.response;
    if (status === 400) {
      yield put(Action.setProfileFeedback(data));
    } else {
      yield handleErrorResponse(status, data);
    }
  }
}

function* navigateToEditProfile({payload: {location: {pathname}}}) {
  if (matchPath(pathname, ROUTE.tdl_profile.matcher)) {
    yield call(getProfile);
  }
}

export default function* editProfileEffects() {
  yield takeEvery([type.LOCATION_CHANGE, type.INIT], navigateToEditProfile);
  yield takeLatest(type.PROFILE_RESET, getProfile);
  yield takeLatest(type.PROFILE_SAVE, saveProfile)
}