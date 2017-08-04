import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {createBrowserHistory} from 'history';

import Root from './containers/Root';
import * as AppActions from './actions/app';
import configureStore from './store/configureStore';
import {SELECTORS} from './reducers/index';

const STORAGE_KEY = 'tdl_state';

const persistedState = localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)) : {};
const history = createBrowserHistory();
const store = configureStore(persistedState, history);
store.subscribe(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()));
});

store.dispatch(AppActions.initialize(SELECTORS.router.getLocation(store.getState())));

ReactDOM.render(
  <Root store={store} history={history}/>,
  document.getElementById('app')
);