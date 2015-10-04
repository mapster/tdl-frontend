var React = require('react');
var PropTypes = React.PropTypes;

var {Modal,Input,Button} = require('react-bootstrap');

function _doChange(event) {
  this.setState({value: event.target.value});
}

var SingleFieldModal = React.createClass({
  propTypes: {
    doCancel: PropTypes.func.isRequired,
    doSave: PropTypes.func.isRequired,
    label: PropTypes.string,
    show: PropTypes.bool.isRequired,
    title: PropTypes.string
  },
  getInitialState: function() {
    return {value: ''};
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({value: nextProps.value});
  },

  render: function() {
    return (
      <Modal show={this.props.show} onHide={this.props.doCancel}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Input type='text' label={this.props.label} value={this.state.value} onChange={_doChange.bind(this)}/>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.doCancel}>Cancel</Button>
          <Button bsStyle='success' onClick={() => this.props.doSave(this.state.value)}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

module.exports = SingleFieldModal;
