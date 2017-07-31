import * as type from '../constants/actionTypes';

const initialState = {};

export const getExercises = (state) => state.exercises;

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case type.EXERCISES_UPDATE:
      return action.data;
    default:
      return state;
  }
}