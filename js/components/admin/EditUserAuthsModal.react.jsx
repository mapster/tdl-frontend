var React = require('react');
var PropTypes = React.PropTypes;

var {Input,Modal,Row,Alert,Button} = require('react-bootstrap');

var AUTH_FIELDS = {
  manage_exercises: 'Manage exercises',
  manage_authorizations: 'Manage user authorizations',
  manage_users: 'Manage users'
};

var _onChange = function(field, event) {
  var change = this.state.auth;
  change[field] = event.target.checked;
  this.setState({auth: change});
};

var EditUserAuthsModal = React.createClass({
  propTypes: {
    auth: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
    doCancel: PropTypes.func.isRequired,
    doDismissError: PropTypes.func.isRequired,
    doSave: PropTypes.func.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired
  },
  getInitialState: function() {
    return {auth: false};
  },
  componentWillReceiveProps: function(nextProps) {
    if(this.props.auth != nextProps.auth){
      var auth = {};
      Object.keys(AUTH_FIELDS).forEach((f) => auth[f] = nextProps.auth[f]);
      this.setState({auth: auth});
    }
  },
  render: function() {
    return (
      <Modal show={this.props.auth && true} onHide={this.props.doCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user authorizations</Modal.Title>
          {this.props.error && (
            <Row>
              <Alert bsStyle="danger" onDismiss={this.props.doDismissError}>{this.props.error}</Alert>
            </Row>
          )}
        </Modal.Header>
        <Modal.Body>
          <form>
            {Object.keys(AUTH_FIELDS).map((f) => (
              <Input key={f} label={AUTH_FIELDS[f]} type='checkbox' checked={this.state.auth[f]} onChange={_onChange.bind(this, f)} />
            ))}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.doCancel}>Cancel</Button>
          <Button bsStyle='success' onClick={() => this.props.doSave(this.state.auth)}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

module.exports = EditUserAuthsModal;
