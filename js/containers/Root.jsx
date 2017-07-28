import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import UserApp from './UserApp';
import App from './App';

const Root = ({store}) => {
  const history = syncHistoryWithStore(browserHistory, store);

  return (
    <Provider store={store}>
      <Router history={history}>
        <Route component={App}>
          <Route path="/"  component={UserApp} />
        </Route>
      </Router>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object
};

export default Root;