import * as type from '../../constants/actionTypes';
import createReducer from '../createReducer';

const initialState = {
  exercises: {},
  currentTab: 'properties',
};

// eslint-disable-next-line no-unused-vars
const pickModifiableFields = ({created_at, updated_at, ...modifiable}) => modifiable;

const changeTab = (state, {data: {key}}) => ({
  ...state,
  currentTab: key,
});

const exerciseUpdate = (state, action) => ({
  ...state,
  exercises: {
    ...state.exercises,
    [action.data.id]: {
      properties: pickModifiableFields(action.data),
      feedback: {},
      isChanged: action.isChanged,
    },
  }
});

const setCurrent = (state, {data: {id}}) => ({
  ...state,
  currentExercise: id,
});

const setCurrentFeedback = (state, {data: feedback}) => ({
  ...state,
  exercises: {
    ...state.exercises,
    [state.currentExercise]: {
      ...state.exercises[state.currentExercise],
      feedback,
    }
  }
});

const newFile = (data, isChanged = false) => ({ id: data.id, data, isChanged });

const sourceFilesUpdate = (state, {data: {exerciseId, sourceFiles}}) => {
  const exercise = state.exercises[exerciseId] || {};

  const changedSourceFiles = (exercise.sourceFiles || []).filter(file => file.isChanged);
  const fileUpdates = Object.keys(sourceFiles)
    .map(name => sourceFiles[name])
    .map(data => newFile(data))
    .filter(file => !changedSourceFiles.some(changed => changed.id === file.id));

  return {
    ...state,
    exercises: {
      ...state.exercises,
      [exerciseId]: {
        ...exercise,
        sourceFiles: [...changedSourceFiles, ...fileUpdates],
      }
    }
  };
};

const setCurrentSourceFile = (state, {data: {sourceFileId}} ) => ({
  ...state,
  currentSourceFileId: sourceFileId,
});

const reducers = {
  [type.EXERCISE_EDITOR_UPDATE]: exerciseUpdate,
  [type.EXERCISE_EDITOR_SET_CURRENT]: setCurrent,
  [type.EXERCISE_EDITOR_SET_CURRENT_FEEDBACK]: setCurrentFeedback,
  [type.EXERCISE_EDITOR_CHANGE_TAB]: changeTab,
  [type.EXERCISE_EDITOR_SOURCE_FILES_UPDATE]: sourceFilesUpdate,
  [type.EXERCISE_EDITOR_SET_CURRENT_FILE]: setCurrentSourceFile,
};

export const getCurrentTab = (state) => state.exerciseEditor.currentTab;

export const getCurrentExercise = (state) => state.exerciseEditor.exercises[state.exerciseEditor.currentExercise];
export const isCurrentExerciseChanged = (state) => (getCurrentExercise(state) || {}).isChanged || false;
export const getCurrentExerciseProperties = (state) => (getCurrentExercise(state) || {}).properties || {};
export const getCurrentExerciseFeedback = (state) => (getCurrentExercise(state) || {}).feedback || {};
export const getCurrentExerciseSourceFiles = (state) => (getCurrentExercise(state) || {}).sourceFiles || [];
export const getCurrentSourceFile = (state) => getCurrentExerciseSourceFiles(state).find(file => file.id === state.exerciseEditor.currentSourceFileId) || getCurrentExerciseSourceFiles(state)[0];

export default createReducer(initialState, reducers);
