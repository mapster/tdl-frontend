import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Row, Col} from 'react-bootstrap';

import Header from './Header';

const menu = [
  {href: '#/exercises', text: 'Exercises'},
  {href: '#/editor', text: 'Editor'}
];

class UserApp extends React.Component {
  render() {
    return (
      <div className='container'>
        <Grid>
          <Row>
            <Col lg={12}>
              <Header title='JavaTDL' menu={menu} />
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }
}

UserApp.propTypes = {
  children: PropTypes.node,
};

export default UserApp;