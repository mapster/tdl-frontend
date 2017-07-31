import {combineReducers} from 'redux';

import exercises from './exercises';
import * as exerciseSelectors from './exercises';
import session from './session';
import * as sessionSelectors from './session';

const getLocation = (state) => state.router.location;

export const SELECTORS = {
  session: sessionSelectors,
  exercises: exerciseSelectors,
  router: {getLocation},
};

export default combineReducers({
  session,
  exercises,
});