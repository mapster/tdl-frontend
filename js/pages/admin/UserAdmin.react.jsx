'use strict';

var React = require('react');
var {PropTypes} = React;
var {OverlayTrigger,Tooltip,Row,Col,Button,Glyphicon} = require('react-bootstrap');

var ConfirmationModal = require('../../components/ConfirmationModal.react');
var ConnectToStore = require('../../mixins/ConnectToStore');
var EditUserAuthsModal = require('../../components/admin/EditUserAuthsModal.react');
var Forbidden = require('../../components/Forbidden.react');
var ResponseConstants = require('../../constants/ResponseConstants');
var UserAdminActions = require('../../actions/admin/UserAdminActions');
var UserFormModal = require('../../components/UserFormModal.react');
var UserList = require('../../components/UserList.react');
var UsersStore = require('../../stores/admin/UsersStore');

function _buildDeleteErrorMessage(error) {
  if(!error) {
    return false;
  }

  switch (error.type) {
    case ResponseConstants.FORBIDDEN:
      return 'You are not authorized to delete this user. ' + (error.messages || '');
    case ResponseConstants.NOT_FOUND:
      return 'User does not exist. ' +(error.messages || '');
    default:
      return error.type + '. ' + (error.messages || '');
  }
}

var UserAdmin = React.createClass({
  propTypes: {
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
  },
  mixins: [
    ConnectToStore('users', UsersStore, function(store){
      return {
        all: store.getUsers(),
        editUserState: store.getEditUserState(),
        editAuths: store.getEditUserAuths(),
        confirmUserDelete: store.getDeleteUser(),
        userAlerts: store.getUserAlerts()
      };
    })
  ],

  render: function() {
    var authorized = this.props.user && this.props.user.auth && this.props.user.auth;
    if(!authorized.manage_users){
      return (<Forbidden />);
    }
    var users = this.state.users.all;
    var userAlerts = this.state.users.userAlerts;
    var confirmUserDelete = (this.state.users && this.state.users.confirmUserDelete || false );
    return (
      <Row>
        {this.state.users.editUserState && (
          <UserFormModal
              doCancel={UserAdminActions.closeUserForm}
              doDismissAlert={UserAdminActions.dismissAlert}
              doSave={UserAdminActions.saveUser}
              doChange={UserAdminActions.updateUserForm}
              {...this.state.users.editUserState}
          />
        )}
        <EditUserAuthsModal
            auth={this.state.users.editAuths}
            doCancel={() => UserAdminActions.editUserAuths(false)}
            doDismissError={UserAdminActions.dismissAlert}
            doSave={UserAdminActions.saveUserAuths}
            error={this.state.users.error}
        />
        <ConfirmationModal
            doCancel={() => UserAdminActions.setDeleteUser(false)}
            doDismissError={UserAdminActions.dismissAlert}
            doOk={() => UserAdminActions.confirmUserDelete(confirmUserDelete)}
            error={_buildDeleteErrorMessage(this.state.users.error)}
            okStyle='danger'
            show={confirmUserDelete && true}
            text={confirmUserDelete.name && 'Delete user: ' + confirmUserDelete.name}
        />
        <Col lg={8}>
          <Row>
            <Col lg={10}><h1 className='inline'>Users</h1></Col>
            <Col lg={2} className='right'>
              <OverlayTrigger placment='right' overlay={(<Tooltip>Add new user</Tooltip>)}>
                <Button bsSize='medium' onClick={UserAdminActions.newUser}>
                  <Glyphicon glyph='plus'/>
                </Button>
              </OverlayTrigger>
            </Col>
          </Row>
          <Row><Col lg={12}>
            <UserList
                doDeleteUser={UserAdminActions.setDeleteUser}
                doDismissUserAlert={UserAdminActions.dismissUserAlert}
                doEditUser={UserAdminActions.editUser}
                doEditUserAuths={UserAdminActions.editUserAuths}
                showAuthsButton={authorized.manage_exercises}
                users={users}
                userAlerts={userAlerts}
            />
          </Col></Row>
        </Col>
      </Row>
    );
  }
});

module.exports = UserAdmin;
