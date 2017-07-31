import * as type from '../../constants/actionTypes';

export function deleteExercise(id) {
  return {
    type: type.EXERCISE_MANAGER_DELETE,
    data: { id },
  }
}

export function editExercise(id) {
  return {
    type: type.EXERCISE_MANAGER_EDIT,
    data: { id },
  };
}

export function createNewExercise() {
  return {
    type: type.EXERCISE_MANAGER_NEW,
  }
}