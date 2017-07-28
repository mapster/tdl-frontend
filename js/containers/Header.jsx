import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Row, Col, Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import * as SessionAction from '../actions/session';
import LoginInput from '../components/LoginInput';

const LoginWell = ({show = true, doLogin}) => {
  if (show) {
    return (
      <Row>
        <Col lg={5} lgPush={7}>
          <LoginInput doLogin={doLogin} />
        </Col>
      </Row>
    );
  }
  return null;
};
LoginWell.propTypes = {
  doLogin: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

const LoggedInNavigation = ({show = true, userName = '', isAdmin = false, doLogout}) => {
  if (show) {
    return (
      <Nav pullRight>
        <NavDropdown title={userName || ''} id="session-nav">
          {isAdmin && <MenuItem href='#/admin'>Admin</MenuItem>}
          <MenuItem onSelect={doLogout}>Logout</MenuItem>
        </NavDropdown>
      </Nav>
    );
  }

  return null;
};
LoggedInNavigation.propTypes = {
  show: PropTypes.bool,
  userName: PropTypes.string,
  isAdmin: PropTypes.bool,
  doLogout: PropTypes.func.isRequired,
};


const Header = ({auth, menu = [], session = false, title = '', doLogin, doLogout}) => {
  const userName = session && session.name;
  const isLoggedIn = userName && true;
  const isAdmin = auth && Object.keys(auth).some((k) => auth[k]);

  return (
    <div>
      <Row>
        <Col lg={12}>
          <Navbar>
            <Navbar.Brand>{title}</Navbar.Brand>
            <Nav>
              {menu.map(function(item, index) {
                return <NavItem key={index} href={item.href}>{item.text}</NavItem>;
              })}
            </Nav>
            <LoggedInNavigation doLogout={doLogout} show={isLoggedIn} userName={userName} isAdmin={isAdmin}/>
          </Navbar>
        </Col>
      </Row>
      <LoginWell doLogin={doLogin} show={!isLoggedIn}/>
    </div>
  );
};
Header.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  menu: PropTypes.array,
  session: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  title: PropTypes.string,
  doLogin: PropTypes.func.isRequired,
  doLogout: PropTypes.func.isRequired,
};


export default compose(
  connect(state => ({
    session: state.session,
  }), {
    doLogin: SessionAction.login,
    doLogout: SessionAction.logout,
  })
)(Header);