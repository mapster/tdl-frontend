import * as type from '../../constants/actionTypes';

export function selectTab(key) {
  return {
    type: type.EXERCISE_EDITOR_CHANGE_TAB,
    data: {key},
  };
}

export function exercisePropertiesUpdate(exercise) {
  return {
    type: type.EXERCISE_EDITOR_PROPERTIES_UPDATE,
    data: exercise,
  };
}

export function exercisePropertiesUpdateFromServer(exercise) {
  return {
    type: type.EXERCISE_EDITOR_PROPERTIES_UPDATE_FROM_SERVER,
    data: exercise,
  }
}

export function setExerciseFeedback(feedback) {
  return {
    type: type.EXERCISE_EDITOR_SET_PROPERTIES_FEEDBACK,
    data: feedback,
  };
}

export function saveExercise(exercise = {}) {
  return {
    type: type.EXERCISE_EDITOR_SAVE_PROPERTIES,
    data: exercise,
  };
}

export function exerciseSourceFilesUpdateFromServer(exerciseId, sourceFiles) {
  return {
    type: type.EXERCISE_EDITOR_SOURCE_FILES_UPDATE_FROM_SERVER,
    data: sourceFiles,
  };
}

export function sourceFileUpdate(data) {
  return {
    type: type.EXERCISE_EDITOR_SOURCE_FILE_UPDATE,
    data: data,
  }
}

export function selectSourceFile(sourceFileId) {
  return {
    type: type.EXERCISE_EDITOR_SET_CURRENT_FILE,
    data: {sourceFileId},
  }
}