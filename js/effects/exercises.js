import {call, put, takeLatest} from 'redux-saga/effects';
import * as type from '../constants/actionTypes';
import * as Api from '../api/exercises';
import * as Action from '../actions/exercises';

function* getExercises() {
  try {
    const exercises = yield call(Api.getExercises);
    yield put(Action.exercisesUpdate(exercises.data));
  } catch (e) {
    // TODO: Handle errors
  }
}

function* navigateToExercises({payload: {pathname}}) {
  if (pathname === '/exercises') {
    yield put(Action.getExercises());
  }
}

export default function* exercisesEffects() {
  yield takeLatest(type.LOCATION_CHANGE, navigateToExercises);
  yield takeLatest(type.EXERCISES_GET, getExercises);
}