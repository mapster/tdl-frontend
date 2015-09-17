'use strict';

var React = require('react');
var {PropTypes} = React;
var {Row,Col,ListGroup,ListGroupItem,Button,ButtonGroup,Glyphicon} = require('react-bootstrap');

var UsersStore = require('../../stores/admin/UsersStore');
var UserAdminActions = require('../../actions/admin/UserAdminActions');
var ConnectToStore = require('../../mixins/ConnectToStore');
var Forbidden = require('../../components/Forbidden.react');
var EditUserModal = require('../../components/admin/EditUserModal.react');
var ConfirmationModal = require('../../components/ConfirmationModal.react');

function _onEditUserClick(user) {
  UserAdminActions.editUser(user);
}

function _setDeleteUser(user) {
  UserAdminActions.setDeleteUser(user);
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
        editError: store.getEditError()
      };
    })
  ],
  render: function() {
    var authorized = this.props.user && this.props.user.auth && this.props.user.auth.manage_users;
    if(!authorized){
      return (<Forbidden />);
    }
    var users = this.state.users && this.state.users.all;
    var confirmUserDelete = (this.state.users && this.state.users.confirmUserDelete || false );
    return (
      <Row>
        <Col lg={8}>
          <h1>Users</h1>
          <EditUserModal user={this.state.users.edit} editError={this.state.users.editError}/>
          <ConfirmationModal show={confirmUserDelete && true} text={'Delete user: ' + confirmUserDelete.name}
              doOk={UserAdminActions.confirmUserDelete} okStyle='danger'
              doCancel={_setDeleteUser.bind(this, false)}
          />
          <ListGroup>
            {users && users.map((user) => (
              <ListGroupItem key={user.id}>
                <Row>
                  <Col lg={9}><span>{user.name}</span></Col>
                  <Col lg={3}>
                    <ButtonGroup className='pull-right'>
                      <Button bsSize='small' onClick={_onEditUserClick.bind(this, user)}><Glyphicon glyph='pencil'/></Button>
                      <Button bsSize='small' onClick={_setDeleteUser.bind(this, user)}><Glyphicon glyph='trash' /></Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </ListGroupItem>))
            }
          </ListGroup>
        </Col>
      </Row>
    );
  }
});

module.exports = UserAdmin;
