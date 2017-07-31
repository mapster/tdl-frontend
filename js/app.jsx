import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {createBrowserHistory} from 'history';

import Root from './containers/Root';
import * as AppActions from './actions/app';
import configureStore from './store/configureStore';
import {SELECTORS} from './reducers/index';


const history = createBrowserHistory();
const store = configureStore({}, history);
store.dispatch(AppActions.initialize(SELECTORS.router.getLocation(store.getState())));

ReactDOM.render(
  <Root store={store} history={history}/>,
  document.getElementById('app')
);
