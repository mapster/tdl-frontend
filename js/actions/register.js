import * as type from '../constants/actionTypes';

export const updateRegistration = registration => ({
  type: type.REGISTER_UPDATE,
  data: registration,
});


export const resetRegistration = () => ({
  type: type.REGISTER_RESET,
});

export const submitRegistration = registration => ({
  type: type.REGISTER_SUBMIT,
  data: registration,
});

export const setRegistrationFeedback = feedback => ({
  type: type.REGISTER_SET_FEEDBACK,
  data: feedback,
});