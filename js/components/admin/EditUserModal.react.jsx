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

function _hasFeedback(field) {
  var errors = this.props.editError && this.props.editError.messages;
  return errors[field];
}

function _getStyle(field) {
  if(_hasFeedback.call(this, field)) {
    return 'error';
  }
  return null;
}

var EditUserModal = React.createClass({
  propTypes: {
    editError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
  },
  getInitialState: function() {
    return {user: false};
  },
  componentWillReceiveProps: function(nextProps) {
    if(this.props.user != nextProps.user){
      var {name,email} = nextProps.user;
      this.setState({
        user: {
          name: name,
          email: email
        }
      });
    }
  },
  render: function() {
    var user = this.state.user;
    var style = _getStyle.bind(this);
    var msg = _hasFeedback.bind(this);
    var hasErr = function(field){
      return msg(field) && true;
    };
    return (
      <Modal show={this.props.user && true} onHide={_close.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input type='text' label='Name' value={user.name}
              bsStyle={style('name')} help={msg('name')} hasFeedback={hasErr('name')} onChange={_handleChange.bind(this, 'name')}
          />
          <Input type='email' label='Email' value={user.email}
              bsStyle={style('email')} help={msg('email')} hasFeedback={hasErr('email')} onChange={_handleChange.bind(this, 'email')}
          />
          <Input type='password' label='Password'
              bsStyle={style('password')} help={msg('password')} hasFeedback={hasErr('password')} onChange={_handleChange.bind(this, 'password')}
          />
          <Input type='password' label='Confirm'
              bsStyle={style('password_confirmation')} help={msg('password_confirmation')} hasFeedback={hasErr('password_confirmation')}
              onChange={_handleChange.bind(this, 'password_confirmation')}
          />
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
