var React = require('react');
var PropTypes = React.PropTypes;
var {Modal,Button,Input,Col,Row,Alert} = require('react-bootstrap');

var ResponseConstants = require('../constants/ResponseConstants');

function _handleChange(field, event) {
  var change = this.state.user;
  change[field] = event.target.value;
  this.setState({user: change});
}

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
    doDismissError: PropTypes.func.isRequired,
    doSave: PropTypes.func.isRequired,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
    title: PropTypes.string,
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired
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
      <Modal show={this.props.user && true} onHide={this.props.doCancel}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
          {errorMsg && (
            <Row>
              <Alert bsStyle="danger" onDismiss={this.props.doDismissError}>{errorMsg}</Alert>
            </Row>
          )}
          <Row className='small-text text-muted'>
            {this.props.user.id && (<Col lg={2}>User ID: {this.props.user.id}</Col>)}
            {this.props.user.created_at && (<Col lg={4}>Created: {this.props.user.created_at}</Col>)}
            {this.props.user.updated_at && (<Col lg={4}>Last update: {this.props.user.updated_at}</Col>)}
          </Row>
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
          <Button onClick={this.props.doCancel}>Cancel</Button>
          <Button bsStyle='success' onClick={() => this.props.doSave(this.state.user)}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }

});

module.exports = UserFormModal;
