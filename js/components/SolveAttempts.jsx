import React from 'react';
import PropTypes from 'prop-types';
import {OverlayTrigger, Popover} from 'react-bootstrap';

import Report from '../models/Report';

const SolveAttempts = ({attempts = [], activeAttemptId, selectSolveAttempt}) => {
  let striped = false;
  return (
    <div className='progress'>
      {attempts.map(function (attempt) {
        const report = Report(attempt.report);
        let classes = 'progress-bar progress-bar-' + report.style + (!striped ? ' progress-bar-striped' : '');
        striped = !striped;

        if (activeAttemptId === attempt.id) {
          classes += ' solve-attempt-active';
        }

        let popover;
        if (report.type === Report.Type.Junit) {
          popover = (
            <Popover id={attempt.id} title='JUnit report'>
              Total tests: {report.tests} <br/>
              Failed tests: {report.failedTests} <br/>
              Execution time: {report.runTime} ms
            </Popover>
          );
        } else if (report.type === Report.Type.Compilation) {
          popover = (
            <Popover id={attempt.id} title='Compilation failed'>
              Failures: {report.failures.length}
            </Popover>);
        } else if (report.type === Report.Type.ServerError) {
          popover = (
            <Popover id={attempt.id} title='Internal server error'>
              {report.failures}
            </Popover>
          );
        }

        return (
          <OverlayTrigger key={attempt.id} trigger={['hover', 'focus']} placement='bottom' overlay={popover} >
            <div className={classes} role='progressbar' aria-valuenow='10' aria-valuemin={0} aria-valuemax={100}
                 style={{width: '10%'}} onClick={() => selectSolveAttempt(attempt.id)}/>
          </OverlayTrigger>
        );
      })}
    </div>
  );
};
SolveAttempts.propTypes = {
  attempts: PropTypes.array,
  activeAttemptId: PropTypes.number,
  selectSolveAttempt: PropTypes.func.isRequired,
};

export default SolveAttempts;
