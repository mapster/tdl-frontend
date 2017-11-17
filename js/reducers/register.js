import * as type from '../constants/actionTypes';
import createReducer from './lib/createReducer';

const initialState = {
  registration: {},
  feedback: {},
};

const registrationUpdate = (state, {data: registration}) => ({
  ...state, registration,
});

const setRegistrationFeedback = (state, {data: feedback}) => ({
  ...state, feedback,
});

const resetRegistration = (state) => ({
  ...state,
  registration: {},
  feedback: {},
});

const reducers = {
  [type.REGISTER_UPDATE]: registrationUpdate,
  [type.REGISTER_SET_FEEDBACK]: setRegistrationFeedback,
  [type.REGISTER_RESET]: resetRegistration,
};

export const SELECTORS = {
  getRegistration: state => state.register.registration,
  getFeedback: state => state.register.feedback,
};

export default createReducer(initialState, reducers);