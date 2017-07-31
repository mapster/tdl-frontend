import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';


import Root from './containers/Root';
import * as AppActions from './actions/app';
import configureStore from './store/configureStore';

const store = configureStore({});
const history = syncHistoryWithStore(browserHistory, store);
store.dispatch(AppActions.initialize());

ReactDOM.render(
  <Root store={store} history={history}/>,
  document.getElementById('app')
);
