import * as type from '../../constants/actionTypes';
import createReducer from '../createReducer';

// eslint-disable-next-line no-unused-vars
const pickModifiableFields = ({created_at, updated_at, ...modifiable}) => modifiable;

const exerciseUpdate = (state, action) => ({
  ...state,
  exercises: {
    ...state.exercises,
    feedback: {},
    [action.data.id]: {
      properties: pickModifiableFields(action.data),
      isChanged: action.isChanged,
    },
  }
});

const setCurrent = (state, {data: {id}}) => ({
  ...state,
  currentExercise: id,
});

const reducers = {
  [type.EXERCISE_EDITOR_UPDATE]: exerciseUpdate,
  [type.EXERCISE_EDITOR_SET_CURRENT]: setCurrent,
};

export const getCurrentExercise = (state) => state.exerciseEditor.exercises[state.exerciseEditor.currentExercise] || {};
export const isCurrentExerciseChanged = (state) => getCurrentExercise(state).isChanged || false;
export const getCurrentExerciseProperties = (state) => getCurrentExercise(state).properties || {};
export const getCurrentExerciseFeedback = (state) => getCurrentExercise(state).feedback || {};

const initialState = {
  exercises: {},
};
export default createReducer(initialState, reducers);
