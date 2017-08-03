import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import * as ROUTE from '../routes';
import Header from './Header';
import Exercises from './Exercises';
import {Route, Switch} from 'react-router-dom';
import NotFound from '../components/NotFound';
import Editor from './Editor';

const menu = [
  {href: ROUTE.tdl_exercises(), text: 'Exercises'},
  {href: ROUTE.tdl_editor(), text: 'Editor'}
];

const UserApp = () => (
  <div className='container'>
    <Grid>
      <Row>
        <Col lg={12}>
          <Header title='JavaTDL' menu={menu}/>
        </Col>
      </Row>
      <Switch>
        <Route path={ROUTE.tdl_exercises()} component={Exercises}/>
        <Route path={ROUTE.tdl_editor()} component={Editor}/>
        <Route component={NotFound}/>
      </Switch>
    </Grid>
  </div>
);

export default UserApp;