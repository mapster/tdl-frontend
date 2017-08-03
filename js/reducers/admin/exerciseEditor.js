import uuid from 'uuid/v4';

import * as type from '../../constants/actionTypes';
import createReducer from '../createReducer';

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

function findSourceFileIndex(sourceFiles, id) {
  return sourceFiles.findIndex(file => file.id === id);
}


function getNewCurrentSourceFileId(sourceFiles, index) {
  if (sourceFiles.length === 1) {
    return null;
  } else if (index === sourceFiles.length-1) {
    return sourceFiles[index-1].id;
  } else {
    return sourceFiles[index+1].id;
  }
}

const newFile = (data, isChanged = false, isNew = false) => ({
  id: data.id,
  data: {contents: '', ...data},
  isChanged,
  isNew,
});

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
  const keepFiles = state.sourceFiles.filter(file => file.isChanged && !file.isDelete);
  const fileUpdates = Object.keys(sourceFiles)
    .map(name => sourceFiles[name])
    .map(data => newFile(data))
    .filter(file => !keepFiles.some(changed => changed.id === file.id));

  let updatedFiles = [...keepFiles, ...fileUpdates];
  if (updatedFiles.length === 0) {
    updatedFiles = [newFile({id: uuid(), name: 'new'}, true, true)];
  }

  return {
    ...state,
    sourceFiles: updatedFiles,
    currentSourceFileId: state.currentSourceFileId || updatedFiles[0].id,
  };
};

const reduceExistingSourceFile = (sourceFiles, data, isChanged, isDelete, index = -1) => {
  if (index < 0) {
    index = findSourceFileIndex(sourceFiles, data.id);
  }
  const reducedSourceFiles = [...sourceFiles];
  reducedSourceFiles[index] = {
    ...reducedSourceFiles[index],
    data,
    isChanged,
    isDelete,
  };
  return reducedSourceFiles;
};

const sourceFileUpdate = (state, {data}) => {
  const index = findSourceFileIndex(state.sourceFiles, data.id);
  const sourceFiles = reduceExistingSourceFile(state.sourceFiles, data, true, false, index);
  return {
    ...state,
    sourceFiles,
  };
};

const sourceFileUpdateFromServer = (state, {data}) => {
  const index = findSourceFileIndex(state.sourceFiles, data.id);
  let sourceFiles = [];
  if (index >= 0) {
    sourceFiles = reduceExistingSourceFile(state.sourceFiles, data, false, false, index);
  } else {
    sourceFiles = [...state.sourceFiles, newFile(data)];
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
      newFile({id, name: 'new'}, true, true),
    ],
    currentSourceFileId: id,
  };
};

const deleteSourceFile = (state, {data: sourceFile}) => {
  const index = findSourceFileIndex(state.sourceFiles, sourceFile.id);
  const newCurrentSourceFileId = getNewCurrentSourceFileId(state.sourceFiles, index);
  if (sourceFile.isNew) {
    return {
      ...state,
      sourceFiles: state.sourceFiles.filter(file => file.id !== sourceFile.id),
      currentSourceFileId: newCurrentSourceFileId,
    };
  }
  return {
    ...state,
    sourceFiles: reduceExistingSourceFile(state.sourceFiles, sourceFile.data, sourceFile.isChanged, true),
    currentSourceFileId: newCurrentSourceFileId,
  };
};

const updateRenameCurrentFile = (state, {data}) => ({
  ...state,
  renameCurrentFile: data,
});

const okRenameCurrentFile = (state) => {
  const index = findSourceFileIndex(state.sourceFiles, state.currentSourceFileId);
  const sourceFiles = reduceExistingSourceFile(state.sourceFiles, {
    ...state.sourceFiles[index].data,
    name: state.renameCurrentFile.value
  }, true, false, index);
  return {
    ...state,
    sourceFiles,
    renameCurrentFile: {show: false},
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
  [type.EXERCISE_EDITOR_RENAME_CURRENT_FILE_UPDATE]: updateRenameCurrentFile,
  [type.EXERCISE_EDITOR_RENAME_CURRENT_FILE_OK]: okRenameCurrentFile,
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
  getCurrentSourceFile: (state) => getSourceFiles(state).find(file => file.id === state.exerciseEditor.currentSourceFileId),
  getRenameCurrentFile: (state) => state.exerciseEditor.renameCurrentFile,
};

export default createReducer(initialState, reducers);
