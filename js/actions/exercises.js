import * as type from '../constants/actionTypes';

export function getExercises() {
  return {
    type: type.EXERCISES_GET,
  };
}

export function exercisesUpdate(exercises) {
  return {
    type: type.EXERCISES_UPDATE,
    data: exercises,
  };
}