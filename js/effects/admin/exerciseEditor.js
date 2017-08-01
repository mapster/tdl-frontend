import * as ROUTE from '../../routes';
import {matchPath} from 'react-router-dom';
import {put, call, takeLatest, takeEvery, select} from 'redux-saga/effects';

import * as type from '../../constants/actionTypes';
import * as Action from '../../actions/admin/exerciseEditor';
import * as Notification from '../../actions/notification';
import * as Api from '../../api/exercises';
import {SELECTORS} from '../../reducers';
import handleErrorResponse from '../errorResponse';

const ADMIN_EXERCISE_EDIT = {
  path: ROUTE.admin_exercises_edit,
  exact: true,
  strict: false,
};

function* navigateToExerciseEditor({payload: {location: {pathname}}}) {
  const path = matchPath(pathname, ADMIN_EXERCISE_EDIT);
  if (path) {
    const id = path.params.id;
    yield put(Action.setCurrentExercise(id));
    // Check if the exercise should be fetched from API, i.e. we don't have it yet or if it has noChanges (to make sure we have a fresh copy)
    const currentExerciseState = yield select(SELECTORS.exerciseEditor.getCurrentExercise);
    if (!currentExerciseState || !currentExerciseState.isChanged) {
      try {
        const exercise = yield call(Api.getExercise, id);
        yield put(Action.exerciseUpdate(exercise.data));
      } catch (e) {
        // TODO: Handle error
      }
    }
  }
}

function* saveExercise({data: exercise}) {
  try {
    const response = yield call(Api.putExercise, exercise);
    yield put(Action.exerciseUpdate(response.data));
  } catch (e) {
    const {data, status} = e.response;
    if (status === 400) {
      yield put(Action.setCurrentExerciseFeedback(data))
    } else {
      yield handleErrorResponse(status, data);
    }
    // TODO: Handle error
  }
}

export default function* exerciseEditorSaga() {
  yield takeEvery([type.LOCATION_CHANGE, type.INIT], navigateToExerciseEditor);
  yield takeLatest(type.EXERCISE_EDITOR_SAVE, saveExercise)
}