import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';

import {SELECTORS} from '../reducers';
import ExerciseListItem from '../components/ExerciseListItem';
import {Route, Switch} from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import * as ROUTE from '../routes';
import SolutionEditor from './SolutionEditor';
import NotFound from '../components/NotFound';
import * as Action from '../actions/exercises';
// var Exercise = require('../components/Exercise.react');

// var Actions = require('../actions/SolutionActions');
// var ConnectToStore = require('../mixins/ConnectToStore');
// var ExerciseStore = require('../stores/ExerciseStore');
// var SolutionEditor = require('../components/SolutionEditor.react');

/* TODO: Should probably be moved to a route
    let view = false;
  if (this.state.ex.editorState.show) {
    view = (
      <SolutionEditor {...this.state.ex.editorState}
          exercises={this.state.ex.exercises}
          solutions={this.state.ex.solutions}
          doClose={Actions.closeEditSolution}
          doCreateNewFile={Actions.createNewFile}
          doDeleteSourceFile={Actions.deleteSourceFile}
          doRenameSourceFile={Actions.renameSourceFile}
          doSaveSourceFile={Actions.saveSourceFile}
          doSelectExerciseSourceFile={Actions.selectExerciseSourceFile}
          doSelectSolutionSourceFile={Actions.selectSolutionSourceFile}
          doSetEditorTab={Actions.setEditorTab}
          doTestSolution={Actions.testSolution}
          doUpdateSourceFile={Actions.updateSourceFile}
      />
    );
  } else {

 */
// Actions.editExercise(exercises[exID])

const Exercises = ({exercises, goToSolution}) => {
  return (
    <Switch>
      <Route path={ROUTE.tdl_exercises()} exact render={props => (
        <ExerciseList {...props} exercises={exercises} deleteExercise={() => {}} editExercise={goToSolution} createNewExercise={() => {}}/>
      )}/>
      <Route path={ROUTE.tdl_exercises_solve()} component={SolutionEditor}/>
      <Route component={NotFound} />
    </Switch>
  );
};

Exercises.propTypes = {
  exercises: PropTypes.object.isRequired,
  goToSolution: PropTypes.func.isRequired,
};

export default compose(
  connect(state => ({
    exercises: SELECTORS.exercises.getExercises(state),
  }), {
    goToSolution: Action.goToSolution,
  })
)(Exercises);