import sessionSaga from './session';
import editProfileSaga from './editProfile';
import exercisesSaga from './exercises';
import exerciseManagerSaga from './admin/exerciseManager';
import exerciseEditorSaga from './admin/exerciseEditor';
import notificationEffects from './notifications';
import confirmationEffects from './confirmation';
import solutionEditorSaga from './solutionEditor';
import userManagerSaga from './admin/userManager';

export const SAGAS = [
  sessionSaga,
  editProfileSaga,
  exercisesSaga,
  solutionEditorSaga,
  exerciseManagerSaga,
  exerciseEditorSaga,
  notificationEffects,
  confirmationEffects,
  userManagerSaga,
];