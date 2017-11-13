import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import TextInput from './TextInput';

function onTextChange(field, value) {
  this.setState({[field]: value});
}

function login(event) {
  event.preventDefault();
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
      <form onSubmit={login.bind(this)}>
        <TextInput id='email' type='email' placeholder='user@email.com' onChange={onTextChange.bind(this, 'email')}/>
        <TextInput id='email' type='password' placeholder='password' onChange={onTextChange.bind(this, 'password')}/>
        <Button type='submit' bsStyle='primary'>Login</Button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  doLogin: PropTypes.func.isRequired,
};

export default LoginForm;