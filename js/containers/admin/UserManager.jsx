import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import * as ROUTE from '../../routes';
import Forbidden from '../../components/Forbidden';
import * as Action from '../../actions/admin/userManager';
import {SELECTORS} from '../../reducers';
import UserList from '../../components/admin/UserList';

const UserEditor = () => (<div />);

const UserManager = ({auth, users, saveUserAuthorizations}) => {
  const authorized = auth && auth.manage_users;
  if (!authorized) {
    return (<Forbidden/>);
  }

  return (
    <Row>
      <Col lg={12}>
        <Switch>
          <Route path={ROUTE.admin_users_edit()} component={UserEditor}/>
          <Route path={ROUTE.admin_users()} render={props => <UserList saveUserAuthorizations={saveUserAuthorizations} users={users} />} />
        </Switch>
      </Col>
    </Row>
  );
};
UserManager.propTypes = {
  auth: PropTypes.object,
  users: PropTypes.array.isRequired,
  saveUserAuthorizations: PropTypes.func.isRequired,
};

export default compose(
  connect(state => ({
    auth: SELECTORS.session.getAuth(state),
    users: SELECTORS.userManager.getUsers(state),
  }), {
    saveUserAuthorizations: Action.saveUserAuthorizations,
  })
)(UserManager);