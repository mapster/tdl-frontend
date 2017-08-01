import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Well, Button} from 'react-bootstrap';
import TextInput from './TextInput';

function onTextChange(field, event) {
  const change = {};
  change[field] = event.target.value;
  this.setState(change);
}

function login() {
  this.props.doLogin(this.state.email, this.state.password);
}

class LoginInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    return (
      <Well bsSize='small'>
        <form>
          <Row>
            <Col lg={5}>
              <TextInput id='email' bsSize='small' type='email' placeholder='user@email.com' onChange={onTextChange.bind(this,'email')}/>
            </Col>
            <Col lg={5}>
              <TextInput id='email' bsSize='small' type='password' placeholder='password' onChange={onTextChange.bind(this,'password')}/>
            </Col>
            <Col lg={1}>
              <Button onClick={login.bind(this)}>Login</Button>
            </Col>
          </Row>
        </form>
      </Well>
    );
  }
}
LoginInput.propTypes = {
  doLogin: PropTypes.func.isRequired,
};

export default LoginInput;