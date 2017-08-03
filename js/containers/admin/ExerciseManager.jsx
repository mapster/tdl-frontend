import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import Forbidden from '../../components/Forbidden';
import ExerciseList from '../../components/ExerciseList';
import {SELECTORS} from '../../reducers';
import * as Action from '../../actions/admin/exerciseManager';
import * as ROUTE from '../../routes';
import ExerciseEditor from './ExerciseEditor';

const ExerciseManager = ({auth, exercises, deleteExercise, editExercise, createNewExercise}) => {
  const authorized = auth && auth.manage_exercises;
  if (!authorized) {
    return (<Forbidden/>);
  }

  return (
    <Row>
      <Col lg={12}>
        <Switch>
          <Route path={ROUTE.admin_exercises_edit()} component={ExerciseEditor}/>
          <Route path={ROUTE.admin_exercises()} render={props => (
            <ExerciseList {...props}
                          deleteExercise={deleteExercise}
                          editExercise={editExercise}
                          createNewExercise={createNewExercise}
                          exercises={exercises}/>)
          }/>
        </Switch>
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
