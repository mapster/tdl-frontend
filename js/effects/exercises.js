import {call, fork, put, takeLatest, takeEvery} from 'redux-saga/effects';
import * as type from '../constants/actionTypes';
import * as ExercisesApi from '../api/exercises';
import * as SolutionsApi from '../api/solutions';
import * as ExercisesAction from '../actions/exercises';
import * as SolutionsAction from '../actions/solutions';
import * as ROUTE from '../routes';
import {matchPath} from 'react-router-dom';
import handleErrorResponse from './errorResponse';

function* getExercises() {
  try {
    const exercises = yield call(ExercisesApi.getExercises);
    yield put(ExercisesAction.exercisesUpdate(exercises.data));
  } catch (e) {
    const {status, data} = e.response;
    yield handleErrorResponse(status, data);
  }
}

function* getSolutions() {
  try {
    const solutions = yield call(SolutionsApi.getSolutions);
    yield put(SolutionsAction.solutionsUpdate(solutions.data));
  } catch (e) {
    const {status, data} = e.response;
    yield handleErrorResponse(status, data);
  }
}

function* navigateToExercises({payload: {location: {pathname}}}) {
  if (matchPath(pathname, ROUTE.tdl_exercises.matcher)) {
    yield fork(getExercises);
    yield fork(getSolutions);
  }
}

export default function* exercisesEffects() {
  yield takeEvery([type.LOCATION_CHANGE, type.INIT], navigateToExercises);
  yield takeLatest(type.EXERCISES_GET, getExercises);
}