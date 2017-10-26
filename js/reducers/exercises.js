import * as type from '../constants/actionTypes';
import createReducer from './lib/createReducer';

const initialState = {};

const exercisesUpdate = (state, {data: exercises}) => exercises;

const reducers = {
  [type.EXERCISES_UPDATE]: exercisesUpdate,
};

export const SELECTORS = {
  getExercises: (state) => state.exercises,
};

export default createReducer(initialState, reducers);