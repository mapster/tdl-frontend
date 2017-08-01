import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import {Link} from 'react-router-dom';
import {Row, Col, Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import * as ROUTE from '../routes';
import {SELECTORS} from '../reducers';
import * as SessionAction from '../actions/session';

const LoggedInNavigation = ({show = true, userName = '', isAdmin = false, doLogout, navigateTo}) => {
  if (show) {
    return (
      <Nav pullRight>
        <NavDropdown title={userName || ''} id="session-nav">
          {isAdmin && <MenuItem onClick={() => navigateTo(ROUTE.admin)}>Admin</MenuItem>}
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


const Header = ({auth, menu = [], session = false, title = '', doLogout, navigateTo}) => {
  const userName = session && session.name;
  const isLoggedIn = userName && true;
  const isAdmin = auth && Object.keys(auth).length > 0;

  return (
    <div>
      <Row>
        <Col lg={12}>
          <Navbar>
            <Navbar.Brand><Link to={ROUTE.tdl}>{title}</Link></Navbar.Brand>
            <Nav>
              {menu.map(function(item, index) {
                return <NavItem key={index} onClick={() => navigateTo(item.href)}>{item.text}</NavItem>;
              })}
            </Nav>
            <LoggedInNavigation navigateTo={navigateTo} doLogout={doLogout} show={isLoggedIn} userName={userName} isAdmin={isAdmin}/>
          </Navbar>
        </Col>
      </Row>
    </div>
  );
};
Header.propTypes = {
  auth: PropTypes.object,
  menu: PropTypes.array,
  session: PropTypes.object,
  title: PropTypes.string,
  doLogout: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
};


export default compose(
  connect(state => ({
    session: SELECTORS.session.getSession(state),
    auth: SELECTORS.session.getAuth(state),
  }), {
    doLogout: SessionAction.logout,
    navigateTo: push,
  })
)(Header);