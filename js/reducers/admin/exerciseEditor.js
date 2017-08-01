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

const reducers = {
  [type.EXERCISE_EDITOR_UPDATE]: exerciseUpdate,
  [type.EXERCISE_EDITOR_SET_CURRENT]: setCurrent,
  [type.EXERCISE_EDITOR_SET_CURRENT_FEEDBACK]: setCurrentFeedback,
  [type.EXERCISE_EDITOR_CHANGE_TAB]: changeTab,
};

export const getCurrentTab = (state) => state.exerciseEditor.currentTab;

export const getCurrentExercise = (state) => state.exerciseEditor.exercises[state.exerciseEditor.currentExercise] || {};
export const isCurrentExerciseChanged = (state) => getCurrentExercise(state).isChanged || false;
export const getCurrentExerciseProperties = (state) => getCurrentExercise(state).properties || {};
export const getCurrentExerciseFeedback = (state) => getCurrentExercise(state).feedback || {};

export default createReducer(initialState, reducers);
