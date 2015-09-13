'use strict';

var React = require('react');
var {Row,Col,Navbar,Nav,NavItem,NavDropdown,MenuItem} = require('react-bootstrap');

var LoginInput = require('./LoginInput.react');
var SessionActions = require('../actions/SessionActions');

var Header = React.createClass({
  render: function() {
    var sessionNav;
    var loginWell;
    if(this.props.session && this.props.session.name) {
      sessionNav = (
        <Nav right>
          <NavDropdown title={this.props.session.name} id="session-nav">
            <MenuItem eventKey='1' onSelect={this._onLogoutClick}>Logout</MenuItem>
          </NavDropdown>
        </Nav>
      );
    } else {
      loginWell = (
        <Row>
          <Col lg={5} lgPush={7}>
            <LoginInput />
          </Col>
        </Row>
      );
    }

    return (
      <div>
        <Row>
          <Col lg={12}>
            <Navbar brand='JCoru'>
              <Nav>
                <NavItem href='#/exercises'>Exercises</NavItem>
              </Nav>
              {sessionNav}
            </Navbar>
          </Col>
        </Row>
        {loginWell}
      </div>
    );
  },
  _onLogoutClick: function() {
    SessionActions.logout();
  }
});

module.exports = Header;
