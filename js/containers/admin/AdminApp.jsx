import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';

import {SELECTORS} from '../../reducers';
import Header from '../Header';

const authorizedMenuItems = {
  'manage_exercises': {href: '/admin/exercises', text: 'Exercises'},
  'manage_users': {href: '/admin/users', text: 'Users'},
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

const AdminApp = ({children, auth}) => (
  <div className='container'>
    <Grid>
      <Row>
        <Col lg={12}>
          <Header title='JavaTDL Admin' menu={createMenu(auth)} />
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          {children}
        </Col>
      </Row>
    </Grid>
  </div>
);
AdminApp.propTypes ={
  children: PropTypes.node,
  auth: PropTypes.object,
};

export default compose(
  connect(state => ({
    auth: SELECTORS.session.getAuth(state),
  }))
)(AdminApp)

