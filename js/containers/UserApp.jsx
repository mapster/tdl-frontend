import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Row, Col} from 'react-bootstrap';

import Header from './Header';

const menu = [
  {href: '/exercises', text: 'Exercises'},
  {href: '/editor', text: 'Editor'}
];

const UserApp = ({children}) => (
  <div className='container'>
    <Grid>
      <Row>
        <Col lg={12}>
          <Header title='JavaTDL' menu={menu} />
        </Col>
      </Row>
      {children}
    </Grid>
  </div>
);

UserApp.propTypes = {
  children: PropTypes.node,
};

export default UserApp;