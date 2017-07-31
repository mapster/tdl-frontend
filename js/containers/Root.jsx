import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {Router, Route} from 'react-router';

import App from './App';
import UserApp from './UserApp';
import Exercises from './Exercises';
import AdminApp from './admin/AdminApp';

const Root = ({store, history}) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route component={App}>
          <Route path="/"  component={UserApp}>
            <Route path="exercises" component={Exercises} />
          </Route>
          <Route path="/admin" component={AdminApp}>
          </Route>
        </Route>
      </Router>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object,
  history: PropTypes.any.isRequired,
};

export default Root;