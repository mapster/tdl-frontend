var React = require('react');
var PropTypes = React.PropTypes;
var {ListGroup, ListGroupItem} = require('react-bootstrap');

var Report = require('../Report');

var FailureList = React.createClass({
  propTypes: {
    attempt: PropTypes.object
  },
  render: function() {
    var attempt = this.props.attempt;
    if(attempt === undefined) {
      return false;
    }
    var report = attempt.report;
    if(report === undefined) {
      return false;
    }
    var failures = Report(report).failures || [];

    return (
      <ListGroup>
        {failures.map(function(f) {
          return (<ListGroupItem key={f.getKey()}>{f.toString()}</ListGroupItem>);
        })}
      </ListGroup>
    );
  }
});

module.exports = FailureList;
