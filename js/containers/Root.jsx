import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';

import * as ROUTE from '../routes.js';
import UserApp from './UserApp';
import AdminApp from './admin/AdminApp';
import NotFound from '../components/NotFound';
import Login from './Login';
import Notifications from './Notifications';
import Confirmation from './Confirmation';

const Root = ({store, history}) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className='container'>
          <Switch>
            <Route path={ROUTE.admin()} component={AdminApp}/>
            <Route path={ROUTE.tdl()} component={UserApp}/>
            <Route path={ROUTE.login()} component={Login}/>
            <Route path={ROUTE.home()} exact={true}>
              <Redirect to={ROUTE.tdl_exercises()}/>
            </Route>
            <Route component={NotFound}/>
          </Switch>
          <Notifications/>
          <Confirmation/>
        </div>
      </ConnectedRouter>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object,
  history: PropTypes.any.isRequired,
};

export default Root;