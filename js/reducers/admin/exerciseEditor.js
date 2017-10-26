import uuid from 'uuid/v4';

import * as type from '../../constants/actionTypes';
import createReducer from '../lib/createReducer';
import * as SourceFile from '../lib/sourceFile';

const initialState = {
  exercise: {},
  sourceFiles: [],
  feedback: {},
  isChanged: false,
  isNew: false,
  currentTab: 'properties',
  currentSourceFileId: null,
  renameCurrentFile: {show: false, value: ''},
};

const changeTab = (state, {data: {key}}) => ({
  ...state,
  currentTab: key,
});

const setCurrentSourceFile = (state, {data: {sourceFileId}}) => ({
  ...state,
  currentSourceFileId: sourceFileId,
});

const exerciseUpdate = (state, {data: exercise}) => ({
  ...state,
  exercise,
  isChanged: true,
});

const exerciseUpdateFromServer = (state, {data: exercise}) => ({
  ...state,
  exercise,
  isChanged: false,
  feedback: {},
});

const setFeedback = (state, {data: feedback}) => ({
  ...state,
  feedback
});

const sourceFilesUpdateFromServer = (state, {data: sourceFiles}) => {
  const updatedFiles = SourceFile.reduceSourceFilesIntoExisting(state.sourceFiles, sourceFiles);
  return {
    ...state,
    sourceFiles: updatedFiles,
    currentSourceFileId: SourceFile.getValidSourceFileId(updatedFiles, state.currentSourceFileId),
  };
};

const sourceFileUpdate = (state, {data, isChanged}) => {
  const index = SourceFile.findSourceFileIndex(state.sourceFiles, data.id);
  // If the incoming update is an update or the file already is changed
  const actuallyChanged = state.sourceFiles[index].isChanged || isChanged;
  const sourceFiles = SourceFile.reduceExistingSourceFile(state.sourceFiles, data, actuallyChanged, false, index);
  return {
    ...state,
    sourceFiles,
  };
};

const sourceFileUpdateFromServer = (state, {data}) => {
  const index = SourceFile.findSourceFileIndex(state.sourceFiles, data.id);
  let sourceFiles = [];
  if (index >= 0) {
    sourceFiles = SourceFile.reduceExistingSourceFile(state.sourceFiles, data, false, false, index);
  } else {
    sourceFiles = [...state.sourceFiles, SourceFile.newFile(data)];
  }
  return {
    ...state,
    sourceFiles,
  };
};

const createNewSourceFile = (state) => {
  const id = uuid();
  return {
    ...state,
    sourceFiles: [
      ...state.sourceFiles,
      SourceFile.newFile({id, name: 'new'}, true, true),
    ],
    currentSourceFileId: id,
  };
};

const deleteSourceFile = (state, {data: sourceFile}) => {
  const index = SourceFile.findSourceFileIndex(state.sourceFiles, sourceFile.id);
  const newCurrentSourceFileId = SourceFile.getNewCurrentSourceFileId(state.sourceFiles, index);
  if (sourceFile.isNew) {
    return {
      ...state,
      sourceFiles: state.sourceFiles.filter(file => file.id !== sourceFile.id),
      currentSourceFileId: newCurrentSourceFileId,
    };
  }
  return {
    ...state,
    sourceFiles: SourceFile.reduceExistingSourceFile(state.sourceFiles, sourceFile.data, sourceFile.isChanged, true),
    currentSourceFileId: newCurrentSourceFileId,
  };
};

const newExercise = () => ({
  ...initialState,
  isNew: true,
  isChanged: true,
});

const reducers = {
  [type.EXERCISE_EDITOR_CHANGE_TAB]: changeTab,
  [type.EXERCISE_EDITOR_SET_CURRENT_FILE]: setCurrentSourceFile,
  [type.EXERCISE_EDITOR_PROPERTIES_UPDATE]: exerciseUpdate,
  [type.EXERCISE_EDITOR_PROPERTIES_UPDATE_FROM_SERVER]: exerciseUpdateFromServer,
  [type.EXERCISE_EDITOR_SET_PROPERTIES_FEEDBACK]: setFeedback,
  [type.EXERCISE_EDITOR_SOURCE_FILES_UPDATE_FROM_SERVER]: sourceFilesUpdateFromServer,
  [type.EXERCISE_EDITOR_SOURCE_FILE_UPDATE]: sourceFileUpdate,
  [type.EXERCISE_EDITOR_SOURCE_FILE_UPDATE_FROM_SERVER]: sourceFileUpdateFromServer,
  [type.EXERCISE_EDITOR_SOURCE_FILE_CREATE_NEW]: createNewSourceFile,
  [type.EXERCISE_EDITOR_SOURCE_FILE_DELETE]: deleteSourceFile,
  [type.EXERCISE_EDITOR_NEW]: newExercise,
};

const getSourceFiles = (state) => state.exerciseEditor.sourceFiles;

export const SELECTORS = {
  getCurrentTab: (state) => state.exerciseEditor.currentTab,
  getExerciseProperties: (state) => state.exerciseEditor.exercise,
  isExercisePropertiesChanged: (state) => state.exerciseEditor.isChanged,
  isExerciseNew: (state) => state.exerciseEditor.isNew,
  isNotChangedAndNotNew: ({exerciseEditor: {isChanged, isNew}}) => !isChanged && !isNew,
  getExercisePropertiesFeedback: (state) => state.exerciseEditor.feedback,
  getSourceFiles: getSourceFiles,
  getCurrentSourceFile: (state) => SourceFile.findSourceFile(getSourceFiles(state), state.exerciseEditor.currentSourceFileId),
};

export default createReducer(initialState, reducers);
