var React = require('react');
var PropTypes = React.PropTypes;
var {Alert} = require('react-bootstrap');

var AlertView = React.createClass({
  propTypes: {
    alert: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
    dismiss: PropTypes.func.isRequired
  },

  render: function() {
    var {alert} = this.props;
    if(!alert) {
      return false;
    }
    return (
      <Alert bsStyle={alert.type} onDismiss={this.props.dismiss}>{alert.text}</Alert>
    );
  }

});

module.exports = AlertView;
