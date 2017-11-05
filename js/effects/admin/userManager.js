import {call, put, select, takeLatest, takeEvery} from 'redux-saga/effects';
import {matchPath} from 'react-router-dom';
import {push} from 'connected-react-router';

import * as type from '../../constants/actionTypes';
import * as ROUTE from '../../routes';
import * as UserManagerAction from '../../actions/admin/userManager';
import {SELECTORS} from '../../reducers';
import * as Api from '../../api/admin/users';
import handleErrorResponse from '../errorResponse';
import NotLoggedInException from '../NotLoggedInException';
import * as Notification from '../../actions/notification';

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

function* saveUser({data: user}) {
  try {
    const {data: savedUser} = yield call(Api.putUser, user);
    yield put(UserManagerAction.editUserUpdateFromServer(savedUser))
    yield put(Notification.success('Saved'));
    yield put(push(ROUTE.admin_users()));
  } catch (e) {
    const {status, data} = e.response;

    if (status === 400) {
      yield put(UserManagerAction.setEditUserFeedback(data));
    } else {
      yield handleErrorResponse(status, data);
    }
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

function* navigateToUserEditor({payload: {location: {pathname}}}) {
  const path = matchPath(pathname, ROUTE.admin_users_edit.matcher);
  if (path) {
    const success = yield call(getUser, path.params.id);

    // If the user does not exist navigate back to user list
    if (success === false) {
      yield put(push(ROUTE.admin_users()));
    }
  }
}

function* getUser(id) {
  try {
    const {data: user} = yield call(Api.getUser, id);
    yield put(UserManagerAction.editUserUpdateFromServer(user));
    return true;
  } catch (e) {
    const {status, data} = e.response;

    if (status === 404) {
      yield put(Notification.error('No user: ' + id));
    } else {
      const result = handleErrorResponse(status, data);
      if (result instanceof NotLoggedInException) {
        return result;
      }
    }
    return false;
  }
}

function* resetUser({data: id}) {
  yield call(getUser, id);
}

export default function* userManagerSaga() {
  yield takeEvery([type.LOCATION_CHANGE, type.INIT], navigateToUserManager);
  yield takeEvery([type.LOCATION_CHANGE, type.INIT], navigateToUserEditor);
  yield takeLatest(type.USER_MANAGER_GET_USERS, getUsers);
  yield takeEvery(type.USER_MANAGER_SAVE_USER_AUTHORIZATIONS, saveUserAuthorizations);
  yield takeLatest(type.USER_MANAGER_SAVE_USER, saveUser);
  yield takeEvery(type.USER_MANAGER_EDIT_USER_RESET, resetUser);
}