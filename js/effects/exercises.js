import {call, put, takeLatest, takeEvery} from 'redux-saga/effects';
import * as type from '../constants/actionTypes';
import * as Api from '../api/exercises';
import * as Action from '../actions/exercises';
import * as ROUTE from '../routes';
import {matchPath} from 'react-router-dom';
import handleErrorResponse from './errorResponse';

function* getExercises() {
  try {
    const exercises = yield call(Api.getExercises);
    yield put(Action.exercisesUpdate(exercises.data));
  } catch (e) {
    const {status, data} = e.response;
    yield handleErrorResponse(status, data);
  }
}

function* navigateToExercises({payload: {location: {pathname}}}) {
  if (matchPath(pathname, ROUTE.tdl_exercises.matcher)) {
    yield call(getExercises);
  }
}

export default function* exercisesEffects() {
  yield takeEvery([type.LOCATION_CHANGE, type.INIT], navigateToExercises);
  yield takeLatest(type.EXERCISES_GET, getExercises);
}