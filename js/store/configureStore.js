import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware, {END} from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import {connectRouter, routerMiddleware} from 'connected-react-router';

import rootReducer from '../reducers';
import configureSagas from './configureSagas';

export default function configureStore(initialState, history) {

  const sagaMiddleware = createSagaMiddleware();
  const routerMiddle = routerMiddleware(history);

  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeWithDevTools(
      applyMiddleware(
        sagaMiddleware,
        routerMiddle
      )
    )
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  store.runSaga = sagaMiddleware.run;
  configureSagas(store);
  store.close = () => store.dispatch(END);

  return store;
}
