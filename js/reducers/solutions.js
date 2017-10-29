import * as type from '../constants/actionTypes';
import createReducer from './lib/createReducer';

const initialState = {};

const solutionsUpdate = (state, {data: solutions}) => solutions;

const reducers = {
  [type.SOLUTIONS_UPDATE]: solutionsUpdate,
};

export const SELECTORS = {
  getSolutions: (state) => state.solutions,
};

export default createReducer(initialState, reducers);