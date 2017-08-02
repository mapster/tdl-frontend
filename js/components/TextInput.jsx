import React from 'react';
import PropTypes from 'prop-types';
import {ControlLabel, FormControl, FormGroup, HelpBlock} from 'react-bootstrap';

const validationStyle = (feedback) => feedback ? 'error' : null;

const TextInput = ({id, label, feedback, onChange, ...props}) => (
  <FormGroup controlId={id || label} validationState={validationStyle(feedback)}>
    {label && <ControlLabel>{label}</ControlLabel>}
    <FormControl onChange={(event) => onChange(event.target.value)} {...props} />
    {feedback && <HelpBlock>{feedback}</HelpBlock>}
  </FormGroup>
);
TextInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  feedback: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default TextInput;