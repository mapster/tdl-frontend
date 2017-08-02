import * as ROUTE from '../../routes';
import {matchPath} from 'react-router-dom';
import {put, call, takeLatest, takeEvery, select, fork} from 'redux-saga/effects';

import * as type from '../../constants/actionTypes';
import * as Action from '../../actions/admin/exerciseEditor';
import * as Notification from '../../actions/notification';
import * as Api from '../../api/exercises';
import {SELECTORS} from '../../reducers';
import handleErrorResponse from '../errorResponse';

const ADMIN_EXERCISE_EDIT_PATH = {
  path: ROUTE.admin_exercises_edit,
  exact: true,
  strict: false,
};

function* getExercise(id) {
  try {
    const {data: exercise} = yield call(Api.getExercise, id);
    yield put(Action.exercisePropertiesUpdateFromServer(exercise));
  } catch (e) {
    handleErrorResponse(e.response.status);
  }
}

function* getExerciseSourceFiles(id) {
  try {
    const {data: files} = yield call(Api.getExerciseSourceFiles, id);
    yield put(Action.exerciseSourceFilesUpdateFromServer(id, files));
  } catch (e) {
    const {data, status} = e.response;
    handleErrorResponse(status, data);
  }
}

function* navigateToExerciseEditor({payload: {location: {pathname}}}) {
  const path = matchPath(pathname, ADMIN_EXERCISE_EDIT_PATH);
  if (path) {
    const id = path.params.id;
    // Check if the exercise should be fetched from API, i.e. we don't have it yet or if it has noChanges (to make sure we have a fresh copy)
    const isChanged = yield select(SELECTORS.exerciseEditor.isExercisePropertiesChanged);
    if (!isChanged) {
      yield fork(getExercise, id);
    }
    yield fork(getExerciseSourceFiles, id);
  }
}

function* saveExercise({data: exercise}) {
  try {
    const response = yield call(Api.putExercise, exercise);
    yield put(Action.exercisePropertiesUpdateFromServer(response.data));
  } catch (e) {
    const {data, status} = e.response;
    if (status === 400) {
      yield put(Action.setExerciseFeedback(data));
    } else {
      yield handleErrorResponse(status, data);
    }
  }
}

function* saveSourceFile({data: sourceFile}) {
  try {
    const {id: exerciseId} = yield select(SELECTORS.exerciseEditor.getExerciseProperties);
    const request = sourceFile.isNew ? Api.postSourceFile : Api.putSourceFile;
    const {data: savedFile} = yield call(request, exerciseId, sourceFile.data);
    yield put(Action.deleteSourceFile(sourceFile));
    yield put(Action.sourceFileUpdateFromServer(savedFile));
    yield put(Action.selectSourceFile(savedFile.id));
  } catch (e) {
    const {data, status} = e.response;
    if (status === 409) {
      yield put(Notification.error(data));
    } else {
      yield handleErrorResponse(status, data instanceof Object ? JSON.stringify(data) : data);
    }
  }
}

function* deleteSourceFile({data: sourceFile}) {
  if (!sourceFile.isNew) {
    try {
      const {id: exerciseId} = yield select(SELECTORS.exerciseEditor.getExerciseProperties);
      yield call(Api.deleteSourceFile, exerciseId, sourceFile.id);
      yield getExerciseSourceFiles(exerciseId);
    } catch (e) {
      const {data, status} = e.response;
      yield handleErrorResponse(status, data);
    }
  }
}

export default function* exerciseEditorSaga() {
  yield takeEvery([type.LOCATION_CHANGE, type.INIT], navigateToExerciseEditor);
  yield takeLatest(type.EXERCISE_EDITOR_SAVE_PROPERTIES, saveExercise);
  yield takeLatest(type.EXERCISE_EDITOR_SOURCE_FILE_SAVE, saveSourceFile);
  yield takeLatest(type.EXERCISE_EDITOR_SOURCE_FILE_DELETE, deleteSourceFile);
}