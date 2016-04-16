var React = require('react');
var PropTypes = React.PropTypes;
var {OverlayTrigger,Popover} = require('react-bootstrap');

var Report = require('../Report');

function _style(report) {
  if(report.success == true) {
    return 'success';
  } else if (report.type == 'compilationReport' || report.type == 'serverError') {
    return 'danger';
  } else if (report.type == 'junitReport'){
    return 'warning';
  } else {
    return 'default';
  }
}

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
          var style = _style(report);
          var striped = style == prev;
          prev = striped || style;
          var classes = 'progress-bar progress-bar-' + style + (striped ? ' progress-bar-striped' : '');

          var popover;
          if(report.type == 'junitReport') {
            popover = (
              <Popover title='JUnit report'>
                Total tests: {report.tests} <br />
                Failed tests: {report.failedTests} <br />
                Runtime fail: {report.runTime}
              </Popover>
            );
          } else if(report.type == 'compilationReport') {
            popover = (
              <Popover title='Compilation failed'>
                Failures: {report.failures.length}
              </Popover>);
          } else if(report.type == 'serverError') {
            popover = (
              <Popover title='Internal server error'>
                {report.failures}
              </Popover>
            );
          }

          return (
            <OverlayTrigger trigger='hover' placement='bottom' overlay={popover}>
              <div key={attempt.id} className={classes} role='progressbar' aria-valuenow='10' aria-valuemin={0} aria-valuemax={100} style={{width: '10%'}} />
            </OverlayTrigger>
          );
        })}
      </div>
    );
  }
});

module.exports = SolveAttempts;
