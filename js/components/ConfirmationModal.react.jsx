var React = require('react');
var PropTypes = React.PropTypes;

var {Modal,Button,Row,Alert} = require('react-bootstrap');

var ConfirmationModal = React.createClass({
  propTypes: {
    doCancel: PropTypes.func.isRequired,
    doDismissError: PropTypes.func.isRequired,
    doOk: PropTypes.func.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    okStyle: PropTypes.string,
    show: PropTypes.bool.isRequired,
    text: PropTypes.string,
    title: PropTypes.string
  },
  render: function() {
    return (
      <Modal show={this.props.show} onHide={this.props.doCancel}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title || 'Confirm'}</Modal.Title>
          {this.props.error && (
            <Row>
              <Alert bsStyle="danger" onDismiss={this.props.doDismissError}>{this.props.error}</Alert>
            </Row>
          )}
        </Modal.Header>
        <Modal.Body>
          <p>{this.props.text}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.doCancel}>Cancel</Button>
          <Button bsStyle={this.props.okStyle || 'default'} onClick={this.props.doOk}>OK</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

module.exports = ConfirmationModal;
