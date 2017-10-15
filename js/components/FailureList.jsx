import React from 'react';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

import Report from '../models/Report';

const FailureList = ({attempt, gotoTest}) => {
  if (attempt === undefined) {
    return false;
  }
  const report = attempt.report;
  if (report === undefined) {
    return false;
  }
  const failures = Report(report).failures || [];

  return (
    <ListGroup>
      {failures.map(function (f) {
        return (<ListGroupItem onClick={() => gotoTest && gotoTest(f.testClassName, f. testMethodName)} key={f.getKey()}>{f.toString()}</ListGroupItem>);
      })}
    </ListGroup>
  );
};

FailureList.propTypes = {
  attempt: PropTypes.object,
  gotoTest: PropTypes.func,
};

export default FailureList;