import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import LoginForm from '../components/LoginForm';
import * as SessionAction from '../actions/session';
import * as ROUTE from '../routes';

const Login = ({doLogin}) => (
  <Jumbotron>
    <h1>Test Driven Learning</h1>
    <p>Register <Link to={ROUTE.register()}>here</Link></p>
    <LoginForm doLogin={doLogin} show={true}/>
  </Jumbotron>
);
Login.propTypes = {
  doLogin: PropTypes.func.isRequired,
};

export default compose(
  connect(
    () => ({}),
    {
      doLogin: SessionAction.login,
    }
  )
)(Login);