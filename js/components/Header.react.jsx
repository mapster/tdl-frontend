'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var {Row,Col,Navbar,Nav,NavItem,NavDropdown,MenuItem} = require('react-bootstrap');

var SessionActions = require('../actions/SessionActions');
var LoginInput = require('./LoginInput.react');

var Header = React.createClass({
  propTypes: {
    menu: PropTypes.array,
    session: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    title: PropTypes.string
  },
  getDefaultProps: function() {
    return {
      menu: [],
      title: '',
      session: false
    };
  },
  render: function() {
    var isLoggedIn = (this.props.session && this.props.session.name);
    var loginWell = (
      <Row>
        <Col lg={5} lgPush={7}>
          <LoginInput />
        </Col>
      </Row>
    );

    var sessionNav = (
      <Nav right>
        <NavDropdown title={this.props.session.name || ''} id="session-nav">
          <MenuItem href='#/admin'>Admin</MenuItem>
          <MenuItem onSelect={SessionActions.logout}>Logout</MenuItem>
        </NavDropdown>
      </Nav>
    );

    return (
      <div>
        <Row>
          <Col lg={12}>
            <Navbar brand={this.props.title}>
              <Nav>
                {this.props.menu.map(function(item, index) {
                  return <NavItem key={index} href={item.href}>{item.text}</NavItem>;
                })}
              </Nav>
              {isLoggedIn && sessionNav}
            </Navbar>
          </Col>
        </Row>
        {!isLoggedIn && loginWell}
      </div>
    );
  }
});

module.exports = Header;
