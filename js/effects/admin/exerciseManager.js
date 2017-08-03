import {put, takeEvery} from 'redux-saga/effects';
import * as type from '../../constants/actionTypes';
import * as ExercisesAction from '../../actions/exercises';
import * as ROUTE from '../../routes';
import {matchPath} from 'react-router-dom';

function* navigateToExerciseManager({payload: {location: {pathname}}}) {
  if (matchPath(pathname, ROUTE.admin_exercises())) {
    yield put(ExercisesAction.getExercises());
  }
}

export default function* exerciseManagerSaga() {
  yield takeEvery([type.LOCATION_CHANGE, type.INIT], navigateToExerciseManager);
}