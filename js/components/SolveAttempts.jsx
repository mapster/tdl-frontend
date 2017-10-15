import React from 'react';
import PropTypes from 'prop-types';
import {OverlayTrigger, Popover} from 'react-bootstrap';

import Report from '../models/Report';

const SolveAttempts = ({attempts = []}) => {
  let striped = false;
  return (
    <div className='progress'>
      {attempts.map(function (attempt) {
        const report = Report(attempt.report);
        const classes = 'progress-bar progress-bar-' + report.style + (!striped ? ' progress-bar-striped' : '');
        striped = !striped;

        let popover;
        if (report.type === 'junitReport') {
          popover = (
            <Popover id={attempt.id} title='JUnit report'>
              Total tests: {report.tests} <br/>
              Failed tests: {report.failedTests} <br/>
              Execution time: {report.runTime} ms
            </Popover>
          );
        } else if (report.type === 'compilationReport') {
          popover = (
            <Popover id={attempt.id} title='Compilation failed'>
              Failures: {report.failures.length}
            </Popover>);
        } else if (report.type === 'serverError') {
          popover = (
            <Popover id={attempt.id} title='Internal server error'>
              {report.failures}
            </Popover>
          );
        }

        return (
          <OverlayTrigger key={attempt.id} trigger={['hover', 'focus']} placement='bottom' overlay={popover}>
            <div className={classes} role='progressbar' aria-valuenow='10' aria-valuemin={0} aria-valuemax={100}
                 style={{width: '10%'}}/>
          </OverlayTrigger>
        );
      })}
    </div>
  );
};
SolveAttempts.propTypes = {
  attempts: PropTypes.array
};

export default SolveAttempts;
