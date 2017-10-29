import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';

import {SELECTORS} from '../reducers';
import {Route, Switch} from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import * as ROUTE from '../routes';
import SolutionEditor from './SolutionEditor';
import NotFound from '../components/NotFound';
import * as Action from '../actions/exercises';

const Exercises = ({exercises, solutions, goToSolution}) => {
  return (
    <Switch>
      <Route path={ROUTE.tdl_exercises()} exact render={props => (
        <ExerciseList {...props} exercises={exercises} solutions={solutions} editExercise={goToSolution} />
      )}/>
      <Route path={ROUTE.tdl_exercises_solve()} component={SolutionEditor}/>
      <Route component={NotFound} />
    </Switch>
  );
};

Exercises.propTypes = {
  exercises: PropTypes.object.isRequired,
  solutions: PropTypes.object.isRequired,
  goToSolution: PropTypes.func.isRequired,
};

export default compose(
  connect(state => ({
    exercises: SELECTORS.exercises.getExercises(state),
    solutions: SELECTORS.solutions.getSolutions(state),
  }), {
    goToSolution: Action.goToSolution,
  })
)(Exercises);