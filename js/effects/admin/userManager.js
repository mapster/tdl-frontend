import {call, put, select, takeLatest, takeEvery} from 'redux-saga/effects';
import {matchPath} from 'react-router-dom';

import * as type from '../../constants/actionTypes';
import * as ROUTE from '../../routes';
import * as UserManagerAction from '../../actions/admin/userManager';
import {SELECTORS} from '../../reducers';
import * as Api from '../../api/admin/users';
import handleErrorResponse from '../errorResponse';

function* navigateToUserManager({payload: {location: {pathname}}}) {
  if (matchPath(pathname, ROUTE.admin_users.matcher)) {
    yield put(UserManagerAction.getUsers());
  }
}

function* getUsers() {
  try {
    const auth = yield select(SELECTORS.session.getAuth);
    if (!auth || !auth.manage_users) {
      return;
    }

    const users = yield call(Api.getUsers);
    yield put(UserManagerAction.usersUpdateFromServer(users.data));
  } catch (e) {
    const {status, data} = e.esponse;
    handleErrorResponse(status, data);
  }
}

function* saveUserAuthorizations({data: authorizations}) {
  try {
    const savedAuthorizations = yield call(Api.putUserAuthorizations, authorizations);
    yield put(UserManagerAction.userAuthorizationUpdateFromServer(savedAuthorizations.data));
  } catch (e) {
    const {status, data} = e.response;
    handleErrorResponse(status, data);
  }
}

export default function* userManagerSaga() {
  yield takeEvery([type.LOCATION_CHANGE, type.INIT], navigateToUserManager);
  yield takeLatest(type.USER_MANAGER_GET_USERS, getUsers);
  yield takeEvery(type.USER_MANAGER_SAVE_USER_AUTHORIZATIONS, saveUserAuthorizations)
}