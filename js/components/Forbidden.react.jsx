var React = require('react');
var {Well} = require('react-bootstrap');

var Forbidden = React.createClass({

  render: function() {
    return (
      <Well bsStyle='danger'>Access denied</Well>
    );
  }

});

module.exports = Forbidden;
