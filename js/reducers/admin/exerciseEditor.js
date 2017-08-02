import * as type from '../../constants/actionTypes';
import createReducer from '../createReducer';

const initialState = {
  exercise: {},
  sourceFiles: [],
  feedback: {},
  isChanged: false,
  currentTab: 'properties',
  currentSourceFileId: null,
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

const newFile = (data, isChanged = false) => ({id: data.id, data, isChanged});

const sourceFilesUpdateFromServer = (state, {data: sourceFiles}) => {
  const changedSourceFiles = state.sourceFiles.filter(file => file.isChanged);
  const fileUpdates = Object.keys(sourceFiles)
    .map(name => sourceFiles[name])
    .map(data => newFile(data))
    .filter(file => !changedSourceFiles.some(changed => changed.id === file.id));

  return {
    ...state,
    sourceFiles: [...changedSourceFiles, ...fileUpdates],
  };
};

const sourceFileUpdate = (state, {data}) => {
  const index = state.sourceFiles.findIndex(file => file.id === data.id);
  const sourceFiles = [...state.sourceFiles];
  sourceFiles[index] = {
    ...sourceFiles[index],
    data,
  };
  return {
    ...state,
    sourceFiles,
  };
};

const reducers = {
  [type.EXERCISE_EDITOR_CHANGE_TAB]: changeTab,
  [type.EXERCISE_EDITOR_SET_CURRENT_FILE]: setCurrentSourceFile,
  [type.EXERCISE_EDITOR_PROPERTIES_UPDATE]: exerciseUpdate,
  [type.EXERCISE_EDITOR_PROPERTIES_UPDATE_FROM_SERVER]: exerciseUpdateFromServer,
  [type.EXERCISE_EDITOR_SET_PROPERTIES_FEEDBACK]: setFeedback,
  [type.EXERCISE_EDITOR_SOURCE_FILES_UPDATE_FROM_SERVER]: sourceFilesUpdateFromServer,
  [type.EXERCISE_EDITOR_SOURCE_FILE_UPDATE]: sourceFileUpdate,
};

export const getCurrentTab = (state) => state.exerciseEditor.currentTab;
export const getExerciseProperties = (state) => state.exerciseEditor.exercise;
export const isExercisePropertiesChanged = (state) => state.exerciseEditor.isChanged;
export const getExercisePropertiesFeedback = (state) => state.exerciseEditor.feedback;
export const getSourceFiles = (state) => state.exerciseEditor.sourceFiles;
export const getCurrentSourceFile = (state) => getSourceFiles(state).find(file => file.id === state.exerciseEditor.currentSourceFileId) || getSourceFiles(state)[0];

export const SELECTORS = {
  getCurrentTab: (state) => state.exerciseEditor.currentTab,
  getExerciseProperties: (state) => state.exerciseEditor.exercise,
  isExercisePropertiesChanged: (state) => state.exerciseEditor.isChanged,
  getExercisePropertiesFeedback: (state) => state.exerciseEditor.feedback,
  getSourceFiles: (state) => state.exerciseEditor.sourceFiles,
  getCurrentSourceFile: (state) => getSourceFiles(state).find(file => file.id === state.exerciseEditor.currentSourceFileId) || getSourceFiles(state)[0],
};

export default createReducer(initialState, reducers);
