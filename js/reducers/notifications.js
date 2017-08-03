import * as type from '../constants/actionTypes';
import createReducer from './createReducer';

const initialState = [];

const addNotification = (state, {data}) => ([{...data}]);
const dismissNotification = (state, {data: {id}}) => {
  if (state.length === 0) {
    return state;
  }
  return state.filter(notification => notification.id !== id);
};

const reducers = {
  [type.NOTIFICATION]: addNotification,
  [type.NOTIFICATION_DISMISS]: dismissNotification,
};

export const SELECTORS = {
  getNotification: state => state.notifications[0],
};

export default createReducer(initialState, reducers);