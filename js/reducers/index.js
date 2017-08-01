import {combineReducers} from 'redux';

import exercises from './exercises';
import * as exerciseSelectors from './exercises';
import session from './session';
import * as sessionSelectors from './session';
import exerciseEditor from './admin/exerciseEditor';
import * as exerciseEditorSelectors from './admin/exerciseEditor';

const getLocation = (state) => state.router.location;

export const SELECTORS = {
  session: sessionSelectors,
  exercises: exerciseSelectors,
  exerciseEditor: exerciseEditorSelectors,
  router: {getLocation},
};

export default combineReducers({
  session,
  exercises,
  exerciseEditor,
});