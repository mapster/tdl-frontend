import {combineReducers} from 'redux';

import exercises, {SELECTORS as exerciseSelectors} from './exercises';
import solutions, {SELECTORS as solutionSelectors} from './solutions';
import session, {SELECTORS as sessionSelectors} from './session';
import editProfile, {SELECTORS as editProfileSelectors} from './editProfile';
import exerciseEditor, {SELECTORS as exerciseEditorSelectors} from './admin/exerciseEditor';
import notifications, {SELECTORS as notificationSelectors} from './notifications';
import confirmation, {SELECTORS as confirmationSelectors} from './confirmation';
import solutionEditor, {SELECTORS as solutionEditorSelectors} from './solutionEditor';
import userManager, {SELECTORS as userManagerSelectors} from './admin/userManager';

const getLocation = (state) => state.router.location;

export const SELECTORS = {
  session: sessionSelectors,
  editProfile: editProfileSelectors,
  exercises: exerciseSelectors,
  solutions: solutionSelectors,
  exerciseEditor: exerciseEditorSelectors,
  notifications: notificationSelectors,
  confirmation: confirmationSelectors,
  solutionEditor: solutionEditorSelectors,
  userManager: userManagerSelectors,
  router: {getLocation},
};

export default combineReducers({
  session,
  editProfile,
  exercises,
  solutions,
  exerciseEditor,
  notifications,
  confirmation,
  solutionEditor,
  userManager,
});