import {combineReducers} from 'redux';

import exercises, {SELECTORS as exerciseSelectors} from './exercises';
import session, {SELECTORS as sessionSelectors} from './session';
import exerciseEditor, {SELECTORS as exerciseEditorSelectors} from './admin/exerciseEditor';
import notifications, {SELECTORS as notificationSelectors} from './notifications';
import confirmation, {SELECTORS as confirmationSelectors} from './confirmation';
import solutionEditor, {SELECTORS as solutionEditorSelectors} from './solutionEditor';

const getLocation = (state) => state.router.location;

export const SELECTORS = {
  session: sessionSelectors,
  exercises: exerciseSelectors,
  exerciseEditor: exerciseEditorSelectors,
  notifications: notificationSelectors,
  confirmation: confirmationSelectors,
  solutionEditor: solutionEditorSelectors,
  router: {getLocation},
};

export default combineReducers({
  session,
  exercises,
  exerciseEditor,
  notifications,
  confirmation,
  solutionEditor,
});