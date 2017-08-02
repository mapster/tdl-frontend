import {combineReducers} from 'redux';

import exercises, {SELECTORS as exerciseSelectors} from './exercises';
import session, {SELECTORS as sessionSelectors} from './session';
import exerciseEditor, {SELECTORS as exerciseEditorSelectors} from './admin/exerciseEditor';
import notification, {SELECTORS as notificationSelectors} from './notification';

const getLocation = (state) => state.router.location;

export const SELECTORS = {
  session: sessionSelectors,
  exercises: exerciseSelectors,
  exerciseEditor: exerciseEditorSelectors,
  notification: notificationSelectors,
  router: {getLocation},
};

export default combineReducers({
  session,
  exercises,
  exerciseEditor,
  notification
});