var React = require('react');
var PropTypes = React.PropTypes;
var {OverlayTrigger,Popover} = require('react-bootstrap');

var Report = require('../Report');

var SolveAttempts = React.createClass({
  propTypes: {
    attempts: PropTypes.array
  },
  render: function() {
    var attempts = this.props.attempts || [];
    var prev;
    return (
      <div className='progress'>
        {attempts.map(function(attempt) {
          var report = Report(attempt.report);
          var striped = report.style == prev;
          prev = striped || report.style;
          var classes = 'progress-bar progress-bar-' + report.style + (striped ? ' progress-bar-striped' : '');

          var popover;
          if(report.type == 'junitReport') {
            popover = (
              <Popover id={attempt.id} title='JUnit report'>
                Total tests: {report.tests} <br />
                Failed tests: {report.failedTests} <br />
                Runtime fail: {report.runTime}
              </Popover>
            );
          } else if(report.type == 'compilationReport') {
            popover = (
              <Popover id={attempt.id} title='Compilation failed'>
                Failures: {report.failures.length}
              </Popover>);
          } else if(report.type == 'serverError') {
            popover = (
              <Popover id={attempt.id} title='Internal server error'>
                {report.failures}
              </Popover>
            );
          }

          return (
            <OverlayTrigger key={attempt.id} trigger={['hover','focus']} placement='bottom' overlay={popover}>
              <div className={classes} role='progressbar' aria-valuenow='10' aria-valuemin={0} aria-valuemax={100} style={{width: '10%'}} />
            </OverlayTrigger>
          );
        })}
      </div>
    );
  }
});

module.exports = SolveAttempts;
