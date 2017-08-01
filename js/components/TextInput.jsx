import React from 'react';
import PropTypes from 'prop-types';
import {ControlLabel, FormControl, FormGroup, HelpBlock} from 'react-bootstrap';

const validationStyle = (feedback) => feedback ? 'error' : null;

const TextInput = ({id, label, feedback, ...props}) => (
  <FormGroup controlId={id || label} validationState={validationStyle(feedback)}>
    {label && <ControlLabel>{label}</ControlLabel>}
    <FormControl {...props} />
    {feedback && <HelpBlock>{feedback}</HelpBlock>}
  </FormGroup>
);
TextInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  feedback: PropTypes.string,
};

export default TextInput;