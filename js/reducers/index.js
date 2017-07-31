import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import exercises from './exercises';
import * as exerciseSelectors from './exercises';
import session from './session';
import * as sessionSelectors from './session';

export const SELECTORS = {
  session: sessionSelectors,
  exercises: exerciseSelectors,
};

export default combineReducers({
  routing: routerReducer,
  session,
  exercises,
});