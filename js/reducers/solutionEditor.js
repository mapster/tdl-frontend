import uuid from 'uuid/v4';

import * as type from '../constants/actionTypes';
import createReducer from './lib/createReducer';
import * as SourceFile from './lib/sourceFile';

const initialState = {
  solution: {},
  solutionFiles: [],
  exerciseFiles: [],
  currentTab: 'solution_sources',
  currentExerciseFileId: null,
  currentSolutionFileId: null,
};

const solutionUpdateFromServer = (state, {data: solution}) => ({
  ...state,
  solution,
});

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

const solutionFileUpdateFromServer = (state, {data: sourceFile}) => {
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

const solutionFileUpdate = (state, {data}) => {
  const index = SourceFile.findSourceFileIndex(state.solutionFiles, data.id);
  const solutionFiles = SourceFile.reduceExistingSourceFile(state.solutionFiles, data, true, false, index);
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
    currentExerciseFileId: SourceFile.getNewCurrentSourceFileId(exerciseFiles, SourceFile.findSourceFileIndex(exerciseFiles, state.currentExerciseFileId)),
  };
};

const createNewSourceFile = (state) => {
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

const reducers = {
  [type.SOLUTION_EDITOR_SOLUTION_UPDATE_FROM_SERVER]: solutionUpdateFromServer,
  [type.SOLUTION_EDITOR_CHANGE_TAB]: changeTab,
  [type.SOLUTION_EDITOR_SET_CURRENT_EXERCISE_FILE]: setCurrentExerciseFile,
  [type.SOLUTION_EDITOR_SET_CURRENT_SOLUTION_FILE]: setCurrentSolutionFile,
  [type.SOLUTION_EDITOR_SOLUTION_SOURCE_FILES_UPDATE_FROM_SERVER]: solutionSourceFilesUpdateFromServer,
  [type.SOLUTION_EDITOR_EXERCISE_SOURCE_FILES_UPDATE_FROM_SERVER]: exerciseSourceFilesUpdateFromServer,
  [type.SOLUTION_EDITOR_SOLUTION_FILE_UPDATE_FROM_SERVER]: solutionFileUpdateFromServer,
  [type.SOLUTION_EDITOR_SOLUTION_FILE_UPDATE]: solutionFileUpdate,
  [type.SOLUTION_EDITOR_SOLUTION_FILE_NEW]: createNewSourceFile,
  [type.SOLUTION_EDITOR_SOLUTION_FILE_DELETE]: deleteSolutionFile,
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
};

export default createReducer(initialState, reducers);