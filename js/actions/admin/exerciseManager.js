import * as type from '../../constants/actionTypes';
import {push} from 'connected-react-router';
import * as ROUTE from '../../routes';

export function deleteExercise(id) {
  return {
    type: type.EXERCISE_MANAGER_DELETE_EXERCISE,
    data: { id },
  }
}

export function editExercise(id) {
  return push(ROUTE.admin_exercises_edit({id}));
}

export function createNewExercise() {
  return push(ROUTE.admin_exercises_edit_new())
}