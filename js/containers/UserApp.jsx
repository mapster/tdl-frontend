import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import * as ROUTE from '../routes';
import Header from './Header';
import Exercises from './Exercises';
import {Route} from 'react-router-dom';

const menu = [
  {href: ROUTE.tdl_exercises, text: 'Exercises'},
  {href: ROUTE.tdl_editor, text: 'Editor'}
];

const UserApp = () => (
  <div className='container'>
    <Grid>
      <Row>
        <Col lg={12}>
          <Header title='JavaTDL' menu={menu} />
        </Col>
      </Row>
      <Route path={ROUTE.tdl_exercises} component={Exercises} />
    </Grid>
  </div>
);

export default UserApp;