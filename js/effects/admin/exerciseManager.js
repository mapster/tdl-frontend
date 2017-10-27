import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import * as type from '../../constants/actionTypes';
import * as ExercisesAction from '../../actions/exercises';
import * as ROUTE from '../../routes';
import {matchPath} from 'react-router-dom';
import handleErrorResponse from '../errorResponse';
import * as Api from '../../api/exercises';

function* deleteExercise({data: {id}}) {
  try {
    yield call(Api.deleteExercise, id);
    yield put(ExercisesAction.getExercises());
  } catch (e) {
    const {status, data} = e.response;
    handleErrorResponse(status, data);
  }
}

function* navigateToExerciseManager({payload: {location: {pathname}}}) {
  if (matchPath(pathname, ROUTE.admin_exercises.matcher)) {
    yield put(ExercisesAction.getExercises());
  }
}

export default function* exerciseManagerSaga() {
  yield takeEvery([type.LOCATION_CHANGE, type.INIT], navigateToExerciseManager);
  yield takeLatest(type.EXERCISE_MANAGER_DELETE_EXERCISE, deleteExercise);
}