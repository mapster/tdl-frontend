import {call, put, takeLatest, takeEvery} from 'redux-saga/effects';
import * as type from '../constants/actionTypes';
import * as Api from '../api/exercises';
import * as Action from '../actions/exercises';
import * as ROUTE from '../routes';
import {matchPath} from 'react-router-dom';

function* getExercises() {
  try {
    const exercises = yield call(Api.getExercises);
    yield put(Action.exercisesUpdate(exercises.data));
  } catch (e) {
    // TODO: Handle errors
  }
}

const TDL_EXERCISES_PATH = {
  path: ROUTE.tdl_exercises,
  exact: true,
  strict: false,
};

function* navigateToExercises({payload: {location: {pathname}}}) {
  if (matchPath(pathname, TDL_EXERCISES_PATH)) {
    yield put(Action.getExercises());
  }
}

export default function* exercisesEffects() {
  yield takeEvery([type.LOCATION_CHANGE, type.INIT], navigateToExercises);
  yield takeLatest(type.EXERCISES_GET, getExercises);
}