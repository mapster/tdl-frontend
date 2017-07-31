import {call, put, takeLatest} from 'redux-saga/effects';
import * as type from '../../constants/actionTypes';
import * as Api from '../../api/exercises';
import * as Action from '../../actions/admin/exerciseManager';
import * as ExercisesAction from '../../actions/exercises';
import * as ROUTE from '../../routes';
import {matchPath} from 'react-router-dom';

const ADMIN_EXERCISES_PATH = {
  path: ROUTE.admin_exercises,
  exact: true,
  strict: false,
};

function* navigateToExerciseManager({payload: {location: {pathname}}}) {
  console.log(pathname);
  if (matchPath(pathname, ADMIN_EXERCISES_PATH)) {
    yield put(ExercisesAction.getExercises());
  }
}

export default function* exerciseManagerSaga() {
  yield takeLatest([type.LOCATION_CHANGE, type.INIT], navigateToExerciseManager);
}