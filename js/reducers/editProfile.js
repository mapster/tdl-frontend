import * as type from '../constants/actionTypes';
import createReducer from './lib/createReducer';

const initialState = {
  profile: {},
  isChanged: false,
  feedback: {},
};

const profileUpdate = (state, {data: profile}) => ({
  ...state, profile, isChanged: true,
});

const profileUpdateFromServer = (state, {data: profile}) => ({
  ...state, profile,
  isChanged: false,
  feedback: {},
});

const setProfileFeedback = (state, {data: feedback}) => ({
  ...state, feedback,
});

const reducers = {
  [type.PROFILE_UPDATE]: profileUpdate,
  [type.PROFILE_UPDATE_FROM_SERVER]: profileUpdateFromServer,
  [type.PROFILE_SET_FEEDBACK]: setProfileFeedback,
};

export const SELECTORS = {
  getProfile: state => state.editProfile.profile,
  getProfileFeedback: state => state.editProfile.feedback,
};

export default createReducer(initialState, reducers);