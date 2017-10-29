import * as type from '../constants/actionTypes';

export const updateProfile = profile => ({
  type: type.PROFILE_UPDATE,
  data: profile,
});

export const updateProfileFromServer = profile => ({
  type: type.PROFILE_UPDATE_FROM_SERVER,
  data: profile,
});

export const resetProfile = () => ({
  type: type.PROFILE_RESET,
});

export const saveProfile = profile => ({
  type: type.PROFILE_SAVE,
  data: profile,
});

export const setProfileFeedback = feedback => ({
  type: type.PROFILE_SET_FEEDBACK,
  data: feedback,
});