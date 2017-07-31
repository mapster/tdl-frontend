import * as type from '../constants/actionTypes';

export const initialize = (location) => ({
  type: type.INIT,
  payload: {location},
});
