import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {Link} from 'react-router';
import {Row, Col, Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import {SELECTORS} from '../reducers';
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

const LoggedInNavigation = ({show = true, userName = '', isAdmin = false, doLogout, navigateTo}) => {
  if (show) {
    return (
      <Nav pullRight>
        <NavDropdown title={userName || ''} id="session-nav">
          {isAdmin && <MenuItem onClick={() => navigateTo('/admin')}>Admin</MenuItem>}
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
  navigateTo: PropTypes.func.isRequired,
};


const Header = ({auth, menu = [], session = false, title = '', doLogin, doLogout, navigateTo}) => {
  const userName = session && session.name;
  const isLoggedIn = userName && true;
  const isAdmin = auth && Object.keys(auth).length > 0;

  return (
    <div>
      <Row>
        <Col lg={12}>
          <Navbar>
            <Navbar.Brand><Link to="/">{title}</Link></Navbar.Brand>
            <Nav>
              {menu.map(function(item, index) {
                return <NavItem key={index} onClick={() => navigateTo(item.href)}>{item.text}</NavItem>;
              })}
            </Nav>
            <LoggedInNavigation navigateTo={navigateTo} doLogout={doLogout} show={isLoggedIn} userName={userName} isAdmin={isAdmin}/>
          </Navbar>
        </Col>
      </Row>
      <LoginWell doLogin={doLogin} show={!isLoggedIn}/>
    </div>
  );
};
Header.propTypes = {
  auth: PropTypes.object,
  menu: PropTypes.array,
  session: PropTypes.object,
  title: PropTypes.string,
  doLogin: PropTypes.func.isRequired,
  doLogout: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
};


export default compose(
  connect(state => ({
    session: SELECTORS.session.getSession(state),
    auth: SELECTORS.session.getAuth(state),
  }), {
    doLogin: SessionAction.login,
    doLogout: SessionAction.logout,
    navigateTo: push,
  })
)(Header);