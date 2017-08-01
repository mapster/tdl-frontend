import React from 'react';
import PropTypes from 'prop-types';
import {ControlLabel, FormControl, FormGroup, HelpBlock} from 'react-bootstrap';

const validationStyle = (feedback) => feedback ? 'error' : null;

const SelectInput = ({id, label, feedback, options, ...props}) => (
  <FormGroup controlId={id} validationState={validationStyle(feedback)}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl componentClass="select" {...props}>
      {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
    </FormControl>
    {feedback && <HelpBlock>{feedback}</HelpBlock>}
  </FormGroup>
);
SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  feedback: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SelectInput