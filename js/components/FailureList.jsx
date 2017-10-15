import React from 'react';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

import Report from '../models/Report';

const FailureList = ({attempt, gotoTest}) => {
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
  }

  return (
    <ListGroup>
      {report.failures.map(function (f) {
        return (<ListGroupItem onClick={() => gotoTest && gotoTest(f.testClassName, f. testMethodName)} key={f.getKey()}>{f.toString()}</ListGroupItem>);
      })}
    </ListGroup>
  );
};

FailureList.propTypes = {
  attempt: PropTypes.object,
  gotoTest: PropTypes.func.isRequired,
};

export default FailureList;