import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware, {END} from 'redux-saga';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';

import rootReducer from '../reducers';
import configureSagas from './configureSagas';

/* eslint-disable no-underscore-dangle */
const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */


export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const routerMiddle = routerMiddleware(browserHistory);

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware),
      applyMiddleware(routerMiddle),
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
