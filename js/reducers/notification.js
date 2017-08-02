import * as type from '../constants/actionTypes';
import createReducer from './createReducer';

const initialState = [];

const addNotification = (state, action) => ([...state, action.data]);

const reducers = {
  [type.NOTIFICATION]: addNotification,
};

export const SELECTORS = {};

export default createReducer(initialState, reducers);