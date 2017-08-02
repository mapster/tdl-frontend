import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';
import * as SessionAction from '../actions/session';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Jumbotron} from 'react-bootstrap';

const Login = ({doLogin}) => (
  <Jumbotron>
    <h1>Test Driven Learning</h1>
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