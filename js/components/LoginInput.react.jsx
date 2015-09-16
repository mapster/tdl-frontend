'use strict';

var React = require('react');
var {Row,Col,Well,Input,ButtonInput} = require('react-bootstrap');

var SessionActions = require('../actions/SessionActions');

function _onTextChange(field, event) {
  var change = {};
  change[field] = event.target.value;
  this.setState(change);
}

function _login() {
  SessionActions.login(this.state.email, this.state.password);
}

var LoginInput = React.createClass({
  getInitialState: function() {
    return {
      email: '',
      password: ''
    };
  },
  render: function() {
    return (
      <Well bsSize='small'>
        <form>
          <Row>
            <Col lg={5}>
              <Input bsSize='small' type='email' placeholder='user@email.com' onChange={_onTextChange.bind(this,'email')} />
            </Col>
            <Col lg={5}>
              <Input bsSize='small' type='password' onChange={_onTextChange.bind(this,'password')} />
            </Col>
            <Col lg={1}>
              <ButtonInput type='submit' value='Login' onClick={_login.bind(this)}/>
            </Col>
          </Row>
        </form>
      </Well>
    );
  }
});

module.exports = LoginInput;
