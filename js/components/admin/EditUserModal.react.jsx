var React = require('react');
var PropTypes = React.PropTypes;
var {Modal,Button,Input} = require('react-bootstrap');

var UserAdminActions = require('../../actions/admin/UserAdminActions');

function _close() {
  UserAdminActions.closeEditUser();
}

function _save() {
  UserAdminActions.saveUser(this.props.user.id, this.state.user);
}

function _handleChange(field, event) {
  var change = this.state.user;
  change[field] = event.target.value;
  this.setState({user: change});
}

var EditUserModal = React.createClass({
  propTypes: {
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
  },
  getInitialState: function() {
    return {user: false};
  },
  componentWillReceiveProps: function(nextProps) {
    var {name,email} = nextProps.user;
    this.setState({
      user: {
        name: name,
        email: email
      }
    });
  },
  render: function() {
    var user = this.state.user;
    return (
      <Modal show={this.props.user && true} onHide={_close.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
          {this.props.editError && (<div>{this.props.editError}</div>)}
        </Modal.Header>
        <Modal.Body>
          <Input type='text' label='Name' value={user.name} onChange={_handleChange.bind(this, 'name')}/>
          <Input type='email' label='Email' value={user.email} onChange={_handleChange.bind(this, 'email')}/>
          <Input type='password' label='Password' onChange={_handleChange.bind(this, 'password')}/>
          <Input type='password' label='Confirm' onChange={_handleChange.bind(this, 'password_confirmation')}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={_close.bind(this)}>Cancel</Button>
          <Button bsStyle='success' onClick={_save.bind(this)}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }

});

module.exports = EditUserModal;
