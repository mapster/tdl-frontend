import React from 'react';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

import Report from '../models/Report';

const failureCompare = (f1, f2) => {
  if (f1.testMethodName > f2.testMethodName) {
    return 1;
  }

  if (f1.testMethodName < f2.testMethodName) {
    return -1;
  }

  return 0;
};

const JUnitFailureList = ({failures, gotoTest}) => (
  <ListGroup>
    {failures.sort(failureCompare).map(failure => (
      <ListGroupItem bsStyle='warning'
                     className='failure-list-item'
                     onClick={() => gotoTest(failure.testClassName, failure.testMethodName)}
                     key={failure.getKey()}>
        {failure.toString()}
      </ListGroupItem>
    ))}
  </ListGroup>
);
JUnitFailureList.propTypes = {
  failures: PropTypes.array.isRequired,
  gotoTest: PropTypes.func.isRequired,
};

const FailureList = ({attempt, gotoTest, gotoSourceFile}) => {
  if (!attempt || !attempt.report) {
    return false;
  }
  const report = Report(attempt.report);

  if (report.type === Report.Type.ServerError) {
    return (
      <ListGroup>
        <ListGroupItem>Server error: {report.text}</ListGroupItem>
      </ListGroup>
    );

  } else if (report.type === Report.Type.Junit) {
    const testClasses = [...new Set(report.failures.map(f => f.testClassName))];

    return (
      <div className='small-top-padding'>
        <h4>Test failures</h4>
        <br />
        {testClasses.map(name => (
          <div key={name}>
            <h5>{name}</h5>
            <JUnitFailureList gotoTest={gotoTest}
                              failures={report.failures.filter(failure => failure.testClassName === name)}/>
          </div>
        ))}
      </div>
    );

  } else if (report.type === Report.Type.Compilation) {
    const classes = [...new Set(report.failures.map(f => f.sourceName))];

    return (
      <div className='medium-top-padding'>
        <h4>Compilation errors</h4>
        <br />
        <br />
        <ListGroup>
          {classes.map(sourceName => (
            <ListGroupItem bsStyle='danger' key={sourceName} onClick={() => gotoSourceFile(sourceName)}>{sourceName}</ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
};

FailureList.propTypes = {
  attempt: PropTypes.object,
  gotoTest: PropTypes.func.isRequired,
  gotoSourceFile: PropTypes.func.isRequired,
};

export default FailureList;