'use strict';

var React = require('react');
var {PropTypes} = React;
var {Label,Row,Col,ListGroup,ListGroupItem,Button,ButtonGroup,Glyphicon} = require('react-bootstrap');

var UsersStore = require('../../stores/admin/UsersStore');
var UserAdminActions = require('../../actions/admin/UserAdminActions');
var ConnectToStore = require('../../mixins/ConnectToStore');
var Forbidden = require('../../components/Forbidden.react');
var UserFormModal = require('../../components/UserFormModal.react');
var ConfirmationModal = require('../../components/ConfirmationModal.react');
var ResponseConstants = require('../../constants/ResponseConstants');

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
        edit: store.getEditUser(),
        confirmUserDelete: store.getDeleteUser(),
        showAddUserForm: store.showAddUserForm(),
        error: store.getError(),
        userAlerts: store.getUserAlerts()
      };
    })
  ],
  render: function() {
    var authorized = this.props.user && this.props.user.auth && this.props.user.auth.manage_users;
    if(!authorized){
      return (<Forbidden />);
    }
    var users = this.state.users && this.state.users.all;
    var userAlerts = this.state.users && this.state.users.userAlerts || [];
    var confirmUserDelete = (this.state.users && this.state.users.confirmUserDelete || false );
    return (
      <Row>
        <UserFormModal
            doCancel={() => UserAdminActions.showAddUserForm(false)}
            doDismissError={() => UserAdminActions.dismissError()}
            doSave={(userData) => UserAdminActions.addUser(userData)}
            error={this.state.users.error}
            title='Add user'
            user={this.state.users.showAddUserForm}
        />
        <UserFormModal
            doCancel={() => UserAdminActions.closeEditUser()}
            doDismissError={() => UserAdminActions.dismissError()}
            doSave={(userData) => UserAdminActions.saveUser(this.state.users.edit.id, userData)}
            error={this.state.users.error}
            title='Edit user'
            user={this.state.users.edit}
        />
        <ConfirmationModal
            doCancel={() => UserAdminActions.setDeleteUser(false)}
            doDismissError={() => UserAdminActions.dismissError()}
            doOk={UserAdminActions.confirmUserDelete}
            error={_buildDeleteErrorMessage(this.state.users.error)}
            okStyle='danger'
            show={confirmUserDelete && true}
            text={'Delete user: ' + confirmUserDelete.name}
        />
        <Col lg={8}>
          <Row>
            <Col lg={10}><h1 className='inline'>Users</h1></Col>
            <Col lg={2} className='right'>
              <Button bsSize='medium' onClick={() => UserAdminActions.showAddUserForm(true)}><Glyphicon glyph='plus'/></Button>
            </Col>
          </Row>
          <Row><Col lg={12}>
            <ListGroup>
              {users && users.map((user) => (
                <ListGroupItem key={user.id}>
                  <Row>
                    <Col lg={7}><span>{user.name}</span></Col>
                    <Col lg={2}>
                      {userAlerts[user.id] && (
                        <Label bsStyle={userAlerts[user.id].type} onClick={() => UserAdminActions.dismissUserAlert(user.id)}>{userAlerts[user.id].text}</Label>
                      )}
                    </Col>
                    <Col lg={3}>
                      <ButtonGroup className='pull-right'>
                        <Button bsSize='small' onClick={() => UserAdminActions.editUser(user)}><Glyphicon glyph='pencil'/></Button>
                        <Button bsSize='small' onClick={() => UserAdminActions.setDeleteUser(user)}><Glyphicon glyph='trash' /></Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </ListGroupItem>))
              }
            </ListGroup>
          </Col></Row>
        </Col>
      </Row>
    );
  }
});

module.exports = UserAdmin;
