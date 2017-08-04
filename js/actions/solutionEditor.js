import * as type from '../constants/actionTypes';
import * as Confirmation from './confirmation';

export const selectTab = (key) => ({
  type: type.SOLUTION_EDITOR_CHANGE_TAB,
  data: {key},
});

export const selectExerciseFile = (sourceFileId) => ({
    type: type.SOLUTION_EDITOR_SET_CURRENT_EXERCISE_FILE,
    data: {sourceFileId},
});

export const selectSolutionFile = (sourceFileId) => ({
  type: type.SOLUTION_EDITOR_SET_CURRENT_SOLUTION_FILE,
  data: {sourceFileId},
});

export const solutionUpdateFromServer = (solution) => ({
  type: type.SOLUTION_EDITOR_SOLUTION_UPDATE_FROM_SERVER,
  data: solution,
});

export const exerciseSourceFilesUpdateFromServer = (sourceFiles) => ({
  type: type.SOLUTION_EDITOR_EXERCISE_SOURCE_FILES_UPDATE_FROM_SERVER,
  data: sourceFiles,
});

export const solutionSourceFilesUpdateFromServer = (sourceFiles) => ({
  type: type.SOLUTION_EDITOR_SOLUTION_SOURCE_FILES_UPDATE_FROM_SERVER,
  data: sourceFiles,
});

export const solutionFileUpdateFromServer = (sourceFile) => ({
  type: type.SOLUTION_EDITOR_SOLUTION_FILE_UPDATE_FROM_SERVER,
  data: sourceFile,
});

export const solutionFileUpdate = (data) => ({
    type: type.SOLUTION_EDITOR_SOLUTION_FILE_UPDATE,
    data: data,
});

export function saveSolutionFile(sourceFile) {
  return {
    type: type.SOLUTION_EDITOR_SOLUTION_FILE_SAVE,
    data: sourceFile,
  }
}

export const createNewSolutionFile = () => ({
    type: type.SOLUTION_EDITOR_SOLUTION_FILE_NEW,
});


export const deleteSolutionFile = (sourceFile, confirm = false) => {
  const action = {
    type: type.SOLUTION_EDITOR_SOLUTION_FILE_DELETE,
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