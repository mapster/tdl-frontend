import {SAGAS} from '../effects';

export default function configureSagas(store) {
  SAGAS.forEach(saga => store.runSaga(saga));
}