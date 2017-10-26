import * as type from '../../constants/actionTypes';
import * as Confirmation from '../confirmation';

export const createNewExercise = () => ({type: type.EXERCISE_EDITOR_NEW});

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

export function exerciseSourceFilesUpdateFromServer(sourceFiles) {
  return {
    type: type.EXERCISE_EDITOR_SOURCE_FILES_UPDATE_FROM_SERVER,
    data: sourceFiles,
  };
}

export function sourceFileUpdate(data, isChanged) {
  return {
    type: type.EXERCISE_EDITOR_SOURCE_FILE_UPDATE,
    data: data,
    isChanged,
  }
}

export function sourceFileUpdateFromServer(data) {
  return {
    type: type.EXERCISE_EDITOR_SOURCE_FILE_UPDATE_FROM_SERVER,
    data,
  };
}

export function selectSourceFile(sourceFileId) {
  return {
    type: type.EXERCISE_EDITOR_SET_CURRENT_FILE,
    data: {sourceFileId},
  }
}

export function saveSourceFile(sourceFile) {
  return {
    type: type.EXERCISE_EDITOR_SOURCE_FILE_SAVE,
    data: sourceFile
  }
}

export function createNewSourceFile() {
  return {
    type: type.EXERCISE_EDITOR_SOURCE_FILE_CREATE_NEW,
  };
}

export const deleteSourceFile = (sourceFile, confirm = false) => {
  const action = {
    type: type.EXERCISE_EDITOR_SOURCE_FILE_DELETE,
    data: sourceFile,
  };
  if (confirm) {
    const description = {
      title: 'Delete source file?',
      text: 'Delete file: "' + sourceFile.data.name + '"?',
    };
    return Confirmation.request(description, action);
  }
  return action;
};
