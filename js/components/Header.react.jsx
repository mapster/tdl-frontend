/*jslint node: true */
'use strict';

var React = require('react');
var {Navbar,Nav,NavItem,NavDropdown,MenuItem} = require('react-bootstrap');

var SessionActions = require('../actions/SessionActions');

var Header = React.createClass({
  render: function() {
    var sessionNav = (<NavItem>Login</NavItem>);
    if(this.props.session && this.props.session.name) {
      sessionNav = (
        <NavDropdown title={this.props.session.name} id="session-nav">
          <MenuItem eventKey='1' onSelect={this._onLogoutClick}>Logout</MenuItem>
        </NavDropdown>
      );
    }
    return (
      <Navbar brand='JCoru'>
        <Nav>
          <NavItem href='#/exercises'>Exercises</NavItem>
        </Nav>
        <Nav right>{sessionNav}</Nav>
      </Navbar>
    );
  },
  _onLogoutClick: function() {
    SessionActions.logout();
  }
});

module.exports = Header;
