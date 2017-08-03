import sessionSaga from './session';
import exercisesSaga from './exercises';
import exerciseManagerSaga from './admin/exerciseManager';
import exerciseEditorSaga from './admin/exerciseEditor';
import notificationEffects from './notifications';

export const SAGAS = [
  sessionSaga,
  exercisesSaga,
  exerciseManagerSaga,
  exerciseEditorSaga,
  notificationEffects,
];