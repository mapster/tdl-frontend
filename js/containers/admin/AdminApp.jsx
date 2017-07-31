import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';

import * as ROUTE from '../../routes';
import {SELECTORS} from '../../reducers';
import Header from '../Header';
import ExerciseManager from './ExerciseManager';
import {Route} from 'react-router-dom';

const authorizedMenuItems = {
  'manage_exercises': {href: ROUTE.admin_exercises, text: 'Exercises'},
  'manage_users': {href: ROUTE.admin_users, text: 'Users'},
};

const createMenu = (auth) => {
  const menu = [{href: '/', text: 'JavaTDL'}];
  if(auth){
    Object.keys(authorizedMenuItems)
      .filter(authType => auth[authType])
      .forEach(authType => menu.push(authorizedMenuItems[authType]));
  }
  return menu;
};

const AdminApp = ({auth}) => (
  <div className='container'>
    <Grid>
      <Row>
        <Col lg={12}>
          <Header title='JavaTDL Admin' menu={createMenu(auth)} />
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <Route path={ROUTE.admin_exercises} component={ExerciseManager} />
        </Col>
      </Row>
    </Grid>
  </div>
);
AdminApp.propTypes ={
  auth: PropTypes.object,
};

export default compose(
  connect(state => ({
    auth: SELECTORS.session.getAuth(state),
  }))
)(AdminApp)

