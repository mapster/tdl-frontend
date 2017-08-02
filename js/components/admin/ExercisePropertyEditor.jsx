import React from 'react';
import PropTypes from 'prop-types';
import {Button, Glyphicon} from 'react-bootstrap';

import ExerciseConstants from '../../constants/ExerciseConstants';
import TextInput from '../TextInput';
import SelectInput from '../SelectInput';

const KIND_OPTIONS = [
  {value: 'expectation', label: 'Expectation'},
  {value: 'error', label: 'Error'},
  {value: 'implementation', label: 'Implementation'},
];

const ExercisePropertyEditor = ({properties, isChanged, feedback, exerciseUpdate, saveExercise}) => {
  const createUpdater = (field) => {
    return (value) => exerciseUpdate({
        ...properties,
        [field]: value,
      },
      true,
    );
  };
  const getFeedback = (field) => feedback[field] || '';

  const {name, kind, difficulty, description} = properties;
  return (
    <form>
      <TextInput label="Name" feedback={getFeedback('name')} value={name || ''} onChange={createUpdater('name')}/>
      <SelectInput id="kind"
                   label={<span>Kind {kind && <Glyphicon glyph={ExerciseConstants.symbols[kind]}/>}</span>}
                   feedback={getFeedback('kind')}
                   options={KIND_OPTIONS}
                   value={kind || ''}
                   onChange={createUpdater('kind')}/>
      <TextInput label='Difficulty' feedback={getFeedback('difficulty')} value={difficulty || ''} onChange={createUpdater('difficulty')}/>
      <TextInput label='Description' feedback={getFeedback('description')} type='textarea' value={description || ''} onChange={createUpdater('description')}/>
      <Button>Reset</Button>
      <Button bsStyle='success' onClick={() => saveExercise(properties)} disabled={!isChanged}>Save</Button>
    </form>
  );

};
ExercisePropertyEditor.propTypes = {
  exerciseUpdate: PropTypes.func.isRequired,
  // doReset: PropTypes.func.isRequired,
  saveExercise: PropTypes.func.isRequired,
  properties: PropTypes.object.isRequired,
  isChanged: PropTypes.bool.isRequired,
  feedback: PropTypes.object.isRequired,
};

export default ExercisePropertyEditor;
