import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import TextInput from './TextInput';

function onTextChange(field, event) {
  const change = {};
  change[field] = event.target.value;
  this.setState(change);
}

function login() {
  this.props.doLogin(this.state.email, this.state.password);
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    return (
      <form>
        <TextInput id='email' type='email' placeholder='user@email.com' onChange={onTextChange.bind(this, 'email')}/>
        <TextInput id='email' type='password' placeholder='password' onChange={onTextChange.bind(this, 'password')}/>
        <Button bsStyle='primary' onClick={login.bind(this)}>Login</Button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  doLogin: PropTypes.func.isRequired,
};

export default LoginForm;