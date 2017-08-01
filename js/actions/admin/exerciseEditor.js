import * as type from '../../constants/actionTypes';

export function selectTab(key) {
  return {
    type: type.EXERCISE_EDITOR_CHANGE_TAB,
    data: {key},
  };
}

export function exerciseUpdate(exercise, isChanged = false) {
  return {
    type: type.EXERCISE_EDITOR_UPDATE,
    data: exercise,
    isChanged,
  };
}

export function setCurrentExercise(id) {
  return {
    type: type.EXERCISE_EDITOR_SET_CURRENT,
    data: {id},
  };
}

export function setCurrentExerciseFeedback(feedback) {
  return {
    type: type.EXERCISE_EDITOR_SET_CURRENT_FEEDBACK,
    data: feedback,
  };
}

export function saveExercise(exercise = {}) {
  return {
    type: type.EXERCISE_EDITOR_SAVE,
    data: exercise,
  };
}