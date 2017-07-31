import {call, put, takeLatest} from 'redux-saga/effects';
import * as type from '../../constants/actionTypes';
import * as Api from '../../api/exercises';
import * as Action from '../../actions/admin/exerciseManager';
import * as ExercisesAction from '../../actions/exercises';

function* navigateToExerciseManager({payload: {pathname}}) {
  if (pathname === '/admin/exercises') {
    yield put(ExercisesAction.getExercises());
  }
}

export default function* exerciseManagerSaga() {
  yield takeLatest(type.LOCATION_CHANGE, navigateToExerciseManager);
}