import React from 'react';
import {Row, Col} from 'react-bootstrap';

import * as ROUTE from '../routes';
import Header from './Header';
import Exercises from './Exercises';
import {Route, Switch} from 'react-router-dom';
import NotFound from '../components/NotFound';
import EditProfile from './EditProfile';

const menu = [
  {href: ROUTE.tdl_exercises(), text: 'Exercises'},
];

const UserApp = () => (
  <div>
    <Row>
      <Col lg={12}>
        <Header title='JavaTDL' menu={menu}/>
      </Col>
    </Row>
    <Switch>
      <Route path={ROUTE.tdl_exercises()} component={Exercises}/>
      <Route path={ROUTE.tdl_profile()} component={EditProfile}/>
      <Route component={NotFound}/>
    </Switch>
  </div>
);

export default UserApp;