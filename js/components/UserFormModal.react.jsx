var React = require('react/addons');
var PropTypes = React.PropTypes;
var {Modal,Button,Input,Col,Row,Alert} = require('react-bootstrap');

var ResponseConstants = require('../constants/ResponseConstants');

function _hasFeedback(field) {
  var error = this.props.error;
  if(!error) {
    return false;
  } else if (error.type != ResponseConstants.INVALID_DATA) {
    return false;
  }
  return error.messages[field];
}

function _getStyle(field) {
  if(_hasFeedback.call(this, field)) {
    return 'error';
  }
  return null;
}

var UserFormModal = React.createClass({
  propTypes: {
    doCancel: PropTypes.func.isRequired,
    doChange: PropTypes.func.isRequired,
    doDismissError: PropTypes.func.isRequired,
    doSave: PropTypes.func.isRequired,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
  },
  shouldComponentUpdate: function(nextProps) {
    var {title, user} = this.props;
    return title !== nextProps.title || user !== nextProps;
  },
  _change: function(field, event) {
    var user = Object.assign({}, this.props.user);
    user[field] = event.target.value;
    this.props.doChange({user});
  },
  _save: function() {
    var {id,name,email,password,password_confirmation} = this.props.user;
    this.props.doSave(id, {name,email,password,password_confirmation});
  },
  render: function() {
    var user = this.props.user;

    // help functions for field feedback
    var style = _getStyle.bind(this);
    var msg = _hasFeedback.bind(this);
    var hasErr = function(field){
      return msg(field) && true;
    };

    // generate error message
    var error = this.props.error;
    if(error && error.type != ResponseConstants.INVALID_DATA) {
      var errorMsg = false;
      switch (error.type) {
        case ResponseConstants.FORBIDDEN:
          errorMsg = 'You are not authorized to save this user. ' + (error.messages || '');
          break;
        case ResponseConstants.NOT_FOUND:
          errorMsg = 'User does not exist. ' +(error.messages || '');
          break;
        default:
          errorMsg = error.type + '. ' + (error.messages || '');
      }
    }
    return (
      <Modal show={user && true} onHide={this.props.doCancel}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
          {errorMsg && (
            <Row>
              <Alert bsStyle="danger" onDismiss={this.props.doDismissError}>{errorMsg}</Alert>
            </Row>
          )}
          <Row className='small-text text-muted'>
            {user.id && (<Col lg={2}>User ID: {user.id}</Col>)}
            {user.created_at && (<Col lg={4}>Created: {user.created_at}</Col>)}
            {user.updated_at && (<Col lg={4}>Last update: {user.updated_at}</Col>)}
          </Row>
        </Modal.Header>
        <Modal.Body>
          <Input type='text' label='Name' value={user.name}
              bsStyle={style('name')} help={msg('name')} hasFeedback={hasErr('name')} onChange={this._change.bind(this, 'name')}
          />
          <Input type='email' label='Email' value={user.email}
              bsStyle={style('email')} help={msg('email')} hasFeedback={hasErr('email')} onChange={this._change.bind(this, 'email')}
          />
          <Input type='password' label='Password'
              bsStyle={style('password')} help={msg('password')} hasFeedback={hasErr('password')} onChange={this._change.bind(this, 'password')}
          />
          <Input type='password' label='Confirm'
              bsStyle={style('password_confirmation')} help={msg('password_confirmation')} hasFeedback={hasErr('password_confirmation')}
              onChange={this._change.bind(this, 'password_confirmation')}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.doCancel}>Cancel</Button>
          <Button bsStyle='success' onClick={this._save}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }

});
UserFormModal.buildState = function(title, user) {
  return Object.assign({}, {title, user});
};

module.exports = UserFormModal;
