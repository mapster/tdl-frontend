import * as type from '../constants/actionTypes';

const initialState = null;

export default function session(state = initialState, action) {
  switch (action.type) {
    case type.SESSION_UPDATE:
      return action.data;
    default:
      return state;
  }
}

// TODO: the store had a refreshSession trigger for UserConstants.SAVE_USER