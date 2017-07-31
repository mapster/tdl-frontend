import sessionSaga from './session';
import exercisesSaga from './exercises';
import exerciseManagerSaga from './admin/exerciseManager';

export const SAGAS = [
  sessionSaga, exercisesSaga, exerciseManagerSaga
];