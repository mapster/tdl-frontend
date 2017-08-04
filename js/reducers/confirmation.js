import createReducer from './lib/createReducer';
import * as type from '../constants/actionTypes';

const initialState = {
  description: {
    show: false,
  },
};

const requestConfirmation = (state, {data: {description, action}}) => {
  return {
    description: {
      ...description,
      show: true,
    },
    action,
  };
};

const clearConfirmation = () => ({...initialState});

const reducers = {
  [type.CONFIRMATION_REQUEST] : requestConfirmation,
  [type.CONFIRMATION_DECLINE]: clearConfirmation,
  [type.CONFIRMATION_CONFIRM]: clearConfirmation,
};

export const SELECTORS = {
  getDescription: (state) => state.confirmation.description,
  getAction: (state) => state.confirmation.action,
};

export default createReducer(initialState, reducers);
