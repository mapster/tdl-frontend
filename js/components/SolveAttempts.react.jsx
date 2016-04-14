var React = require('react');
var PropTypes = React.PropTypes;
var {ProgressBar} = require('react-bootstrap');

var SolveAttempts = React.createClass({
  propTypes: {
    attempts: PropTypes.array},
  render: function() {
    var attempts = this.props.attempts || [];
    var striped = true;
    return (
      <ProgressBar>
        {attempts.map(function(attempt) {
          striped = !striped;
          return (<ProgressBar striped={striped} key={attempt.id} bsStyle="danger" now={10} />);
        })}
      </ProgressBar>
    );
  }
});

module.exports = SolveAttempts;
