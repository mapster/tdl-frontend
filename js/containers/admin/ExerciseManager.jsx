import React from 'react';
import PropTypes from 'prop-types';
import {Button, Col, Glyphicon, Row} from 'react-bootstrap';
import Forbidden from '../../components/Forbidden';
import ExerciseList from '../../components/ExerciseList';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {SELECTORS} from '../../reducers';
import * as Action from '../../actions/admin/exerciseManager';


// var Actions = require('../../actions/admin/ExerciseManagerActions');
// var ConnectToStore = require('../../mixins/ConnectToStore');
// var ExerciseEditor = require('../../components/admin/ExerciseEditor.react');
// var ExerciseList = require('../../components/ExerciseList.react');
// var ExerciseManagerStore = require('../../stores/admin/ExerciseManagerStore');

// if (this.state.ex.editorState.show) {
//   view = (
//     <ExerciseEditor
//       {...this.state.ex.editorState}
//       doCreateNewFile={Actions.createNewFile}
//       doDeleteSourceFile={Actions.deleteSourceFile}
//       doRenameSourceFile={Actions.renameSourceFile}
//       doResetExerciseProperties={Actions.resetExerciseProperties}
//       doSaveExerciseProperties={Actions.saveExerciseProperties}
//       doSaveSourceFile={Actions.saveSourceFile}
//       doSelectSourceFile={Actions.selectSourceFile}
//       doSetEditorTab={Actions.setEditorTab}
//       doUpdateExerciseProperties={Actions.updateExerciseProperties}
//       doUpdateSourceFile={Actions.updateSourceFile}
//       doClose={() => Actions.closeEditExercise(this.state.ex.editorState.properties, this.state.ex.editorState.sourceFiles)}
//     />
//   );
// } else {

const ExerciseManager = ({auth, exercises, deleteExercise, editExercise, createNewExercise}) => {
  const authorized = auth && auth.manage_exercises;
  if (!authorized) {
    return (<Forbidden/>);
  }

  return (
    <Row>
      <Col lg={8}>
        <Row>
          <Col lg={10}><h1 className='inline'>Exercises</h1></Col>
          <Col lg={2} className='right'>
            <Button bsSize='sm' onClick={createNewExercise}><Glyphicon glyph='plus'/></Button>
          </Col>
        </Row>
        <Row><Col lg={12}>
          <ExerciseList deleteExercise={deleteExercise}
                        editExercise={editExercise}
                        exercises={exercises}
          />
        </Col></Row>
      </Col>
    </Row>
  );
};
ExerciseManager.propTypes = {
  auth: PropTypes.object,
  exercises: PropTypes.object.isRequired,
  deleteExercise: PropTypes.func.isRequired,
  editExercise: PropTypes.func.isRequired,
  createNewExercise: PropTypes.func.isRequired,
};


export default compose(
  connect(state => ({
    auth: SELECTORS.session.getAuth(state),
    exercises: SELECTORS.exercises.getExercises(state),
  }), {
    deleteExercise: Action.deleteExercise,
    editExercise: Action.editExercise,
    createNewExercise: Action.createNewExercise,
  })
)(ExerciseManager);
