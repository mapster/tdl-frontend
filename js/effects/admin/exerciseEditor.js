import * as ROUTE from '../../routes';
import {matchPath} from 'react-router-dom';
import {put, call, takeLatest, takeEvery, select} from 'redux-saga/effects';

import * as type from '../../constants/actionTypes';
import * as Action from '../../actions/admin/exerciseEditor';
import * as Notification from '../../actions/notification';
import * as Api from '../../api/exercises';
import {SELECTORS} from '../../reducers';
import handleErrorResponse from '../errorResponse';
import {push} from 'connected-react-router';

function* getExercise(id) {
  try {
    const {data: exercise} = yield call(Api.getExercise, id);
    yield put(Action.exercisePropertiesUpdateFromServer(exercise));
    return true;
  } catch (e) {
    const {status, data} = e.response;
    if (status === 404) {
      yield put(Notification.error('No such exercise: ' + id));
      return false;
    } else {
      handleErrorResponse(status, data);
      return false
    }
  }
}

function* getExerciseSourceFiles(id) {
  try {
    const {data: files} = yield call(Api.getExerciseSourceFiles, id);
    yield put(Action.exerciseSourceFilesUpdateFromServer(files));
    return true;
  } catch (e) {
    const {status, data} = e.response;
    if (status === 404) {
      yield put(Notification.error('No such exercise: ' + id));
      return false;
    } else {
      handleErrorResponse(status, data);
      return false;
    }
  }
}

function* navigateToExerciseEditor({payload: {location: {pathname}}}) {
  // skip if the location is to new exercise
  if (matchPath(pathname, ROUTE.admin_exercises_edit_new.matcher)) {
    yield put(Action.createNewExercise());
    return;
  }

  const path = matchPath(pathname, ROUTE.admin_exercises_edit.matcher);
  if (path) {
    const id = path.params.id;
    // Check if the exercise should be fetched from API
    const isNotChangedAndNotNew = yield select(SELECTORS.exerciseEditor.isNotChangedAndNotNew);
    if (isNotChangedAndNotNew) {
      const success = yield call(getExercise, id);
      if (!success) {
        yield put(push(ROUTE.admin_exercises()));
        return;
      }
    }
    const success = yield call(getExerciseSourceFiles, id);
    if (!success) {
      yield put(push(ROUTE.admin_exercises()));
    }
  }
}

function* saveExercise({data: exercise}) {
  try {
    const isNew = yield select(SELECTORS.exerciseEditor.isExerciseNew);
    const request = isNew ? Api.postExercise : Api.putExercise;
    const response = yield call(request, exercise);
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
    if (sourceFile.isNew) {
      yield put(Action.deleteSourceFile(sourceFile));
    }
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