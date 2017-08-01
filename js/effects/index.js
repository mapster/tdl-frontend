import sessionSaga from './session';
import exercisesSaga from './exercises';
import exerciseManagerSaga from './admin/exerciseManager';
import exerciseEditorSaga from './admin/exerciseEditor';

export const SAGAS = [
  sessionSaga,
  exercisesSaga,
  exerciseManagerSaga,
  exerciseEditorSaga,
];