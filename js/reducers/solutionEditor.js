import uuid from 'uuid/v4';

import * as type from '../constants/actionTypes';
import createReducer from './lib/createReducer';
import * as SourceFile from './lib/sourceFile';

const initialState = {
  solution: {},
  solutionFiles: [],
  exerciseFiles: [],
  solveAttempts: [],
  currentTab: 'solution_sources',
  currentExerciseFileId: null,
  currentSolutionFileId: null,
};

const solutionUpdateFromServer = (state, {data: solution}) => {
  if (state.solution.id !== solution.id) {
    return {
      ...initialState,
      solution,
    }
  }
  return {
    ...state,
    solution,
  };
};

const changeTab = (state, {data: {key}}) => ({
  ...state,
  currentTab: key,
});

const setCurrentExerciseFile = (state, {data: {sourceFileId}}) => ({
  ...state,
  currentExerciseFileId: sourceFileId,
});

const setCurrentSolutionFile = (state, {data: {sourceFileId}}) => ({
  ...state,
  currentSolutionFileId: sourceFileId,
});

const solutionSourceFilesUpdateFromServer = (state, {data: sourceFiles}) => {
  const updatedFiles = SourceFile.reduceSourceFilesIntoExisting(state.solutionFiles, sourceFiles);
  return {
    ...state,
    solutionFiles: updatedFiles,
    currentSolutionFileId: SourceFile.getValidSourceFileId(updatedFiles, state.currentSolutionFileId),
  };
};

const solutionSourceFileUpdateFromServer = (state, {data: sourceFile}) => {
  const index = SourceFile.findSourceFileIndex(state.solutionFiles, sourceFile.id);
  let solutionFiles = [];
  if (index >= 0) {
    solutionFiles = SourceFile.reduceExistingSourceFile(state.solutionFiles, sourceFile, false, false, index);
  } else {
    solutionFiles = [...state.solutionFiles, SourceFile.newFile(sourceFile)];
  }
  return {
    ...state,
    solutionFiles,
  };
};

const solutionFileUpdate = (state, {data, isChanged}) => {
  const index = SourceFile.findSourceFileIndex(state.solutionFiles, data.id);
  // If the incoming update is an update or the file already is changed
  const actuallyChanged = state.solutionFiles[index].isChanged || isChanged;
  const solutionFiles = SourceFile.reduceExistingSourceFile(state.solutionFiles, data, actuallyChanged, false, index);
  return {
    ...state,
    solutionFiles,
  };
};

const exerciseSourceFilesUpdateFromServer = (state, {data: sourceFiles}) => {
  const exerciseFiles = Object.keys(sourceFiles)
    .map(name => sourceFiles[name])
    .map(data => SourceFile.newFile(data, false, false, true));
  return {
    ...state,
    exerciseFiles,
    currentExerciseFileId: SourceFile.getValidSourceFileId(exerciseFiles, state.currentExerciseFileId),
  };
};

const createNewSolutionFile = (state) => {
  const id = uuid();
  return {
    ...state,
    solutionFiles: [
      ...state.solutionFiles,
      SourceFile.newFile({id, name: 'new'}, true, true),
    ],
    currentSolutionFileId: id,
  };
};

const deleteSolutionFile = (state, {data: sourceFile}) => {
  const index = SourceFile.findSourceFileIndex(state.solutionFiles, sourceFile.id);
  const newCurrentSourceFileId = SourceFile.getNewCurrentSourceFileId(state.solutionFiles, index);
  if (sourceFile.isNew) {
    return {
      ...state,
      solutionFiles: state.solutionFiles.filter(file => file.id !== sourceFile.id),
      currentSolutionFileId: newCurrentSourceFileId,
    };
  }
  return {
    ...state,
    solutionFiles: SourceFile.reduceExistingSourceFile(state.solutionFiles, sourceFile.data, sourceFile.isChanged, true),
    currentSolutionFileId: newCurrentSourceFileId,
  };
};

const solveAttemptsUpdateFromServer = (state, {data: solveAttempts}) => ({
  ...state,
  solveAttempts,
});

const newSolveAttempt = (state, {data: solveAttempt}) => ({
  ...state,
  solveAttempts: [...state.solveAttempts.slice(-9), solveAttempt],
});

const reducers = {
  [type.SOLUTION_EDITOR_SOLUTION_UPDATE_FROM_SERVER]: solutionUpdateFromServer,
  [type.SOLUTION_EDITOR_CHANGE_TAB]: changeTab,
  [type.SOLUTION_EDITOR_SET_CURRENT_EXERCISE_FILE]: setCurrentExerciseFile,
  [type.SOLUTION_EDITOR_SET_CURRENT_SOLUTION_FILE]: setCurrentSolutionFile,
  [type.SOLUTION_EDITOR_SOLUTION_SOURCE_FILES_UPDATE_FROM_SERVER]: solutionSourceFilesUpdateFromServer,
  [type.SOLUTION_EDITOR_EXERCISE_SOURCE_FILES_UPDATE_FROM_SERVER]: exerciseSourceFilesUpdateFromServer,
  [type.SOLUTION_EDITOR_SOLUTION_SOURCE_FILE_UPDATE_FROM_SERVER]: solutionSourceFileUpdateFromServer,
  [type.SOLUTION_EDITOR_SOLUTION_SOURCE_FILE_UPDATE]: solutionFileUpdate,
  [type.SOLUTION_EDITOR_SOLUTION_SOURCE_FILE_NEW]: createNewSolutionFile,
  [type.SOLUTION_EDITOR_SOLUTION_SOURCE_FILE_DELETE]: deleteSolutionFile,
  [type.SOLUTION_EDITOR_SOLVE_ATTEMPTS_UPDATE_FROM_SERVER]: solveAttemptsUpdateFromServer,
  [type.SOLUTION_EDITOR_SOLVE_ATTEMPT_NEW]: newSolveAttempt,
};

const getExerciseFiles = (state) => state.solutionEditor.exerciseFiles;
const getSolutionFiles = (state) => state.solutionEditor.solutionFiles;

export const SELECTORS = {
  getSolution: state => state.solutionEditor.solution,
  getCurrentTab: state => state.solutionEditor.currentTab,
  getCurrentExerciseFile: state => SourceFile.findSourceFile(getExerciseFiles(state), state.solutionEditor.currentExerciseFileId),
  getCurrentSolutionFile: state => SourceFile.findSourceFile(getSolutionFiles(state), state.solutionEditor.currentSolutionFileId),
  getSolutionFiles: getSolutionFiles,
  getExerciseFiles: getExerciseFiles,
  getSolutionSourceFiles: state => getSolutionFiles(state).map(file => file.data),
  getSolveAttempts: state => state.solutionEditor.solveAttempts,
};

export default createReducer(initialState, reducers);