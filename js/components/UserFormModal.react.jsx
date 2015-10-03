var React = require('react/addons');
var PropTypes = React.PropTypes;
var {Modal,Button,Input,Col,Row} = require('react-bootstrap');

var AlertView = require('./AlertView.react');

var UserFormModal = React.createClass({
  propTypes: {
    alert: PropTypes.object.isRequired,
    doCancel: PropTypes.func.isRequired,
    doChange: PropTypes.func.isRequired,
    doDismissAlert: PropTypes.func.isRequired,
    doSave: PropTypes.func.isRequired,
    feedback: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired
  },
  shouldComponentUpdate: function(nextProps) {
    var {title, user} = this.props;
    return title !== nextProps.title || user !== nextProps;
  },
  _change: function(field, event) {
    var user = Object.assign({}, this.props.user);
    user[field] = event.target.value;
    this.props.doChange(user);
  },
  _save: function() {
    var {id,name,email,password,password_confirmation} = this.props.user;
    this.props.doSave(id, {name,email,password,password_confirmation});
  },
  _feedback: function(field) {
    return this._help(field) && true;
  },
  _help: function(field) {
    return this.props.feedback[field] || false;
  },
  _style: function(field) {
    return (this._feedback(field) && 'error') || null;
  },

  render: function() {
    var user = this.props.user;

    return (
      <Modal show={user && true} onHide={this.props.doCancel}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
            <Row><AlertView alert={this.props.alert} dismiss={this.props.doDismissAlert} /></Row>
          <Row className='small-text text-muted'>
            {user.id && (<Col lg={2}>User ID: {user.id}</Col>)}
            {user.created_at && (<Col lg={4}>Created: {user.created_at}</Col>)}
            {user.updated_at && (<Col lg={4}>Last update: {user.updated_at}</Col>)}
          </Row>
        </Modal.Header>
        <Modal.Body>
          <Input type='text' label='Name' value={user.name}
              bsStyle={this._style('name')}
              help={this._help('name')}
              hasFeedback={this._feedback('name')}
              onChange={this._change.bind(this, 'name')}
          />
          <Input type='email' label='Email' value={user.email}
              bsStyle={this._style('email')}
              help={this._help('email')}
              hasFeedback={this._feedback('email')}
              onChange={this._change.bind(this, 'email')}
          />
          <Input type='password' label='Password'
              bsStyle={this._style('password')}
              help={this._help('password')}
              hasFeedback={this._feedback('password')}
              onChange={this._change.bind(this, 'password')}
          />
          <Input type='password' label='Confirm'
              bsStyle={this._style('password_confirmation')}
              help={this._help('password_confirmation')}
              hasFeedback={this._feedback('password_confirmation')}
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

module.exports = UserFormModal;
