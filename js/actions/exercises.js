import * as type from '../constants/actionTypes';
import {push} from 'connected-react-router';
import * as ROUTE from '../routes';

export const getExercises = () => ({
  type: type.EXERCISES_GET,
});

export const exercisesUpdate = (exercises) => ({
  type: type.EXERCISES_UPDATE,
  data: exercises,
});

export const goToSolution = (exerciseId) => push(ROUTE.tdl_exercises_solve({exerciseId}));