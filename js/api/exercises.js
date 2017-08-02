import axios from 'axios';
import {Host} from '../appconfig';

const EXERCISES_RESOURCE_URL = Host + '/exercises';

export function getExercises() {
  return axios.get(EXERCISES_RESOURCE_URL);
}

export function getExercise(id) {
  return axios.get(EXERCISES_RESOURCE_URL + '/' + id);
}

export function putExercise(exercise) {
// eslint-disable-next-line no-unused-vars
  const {id, ...payload} = exercise;
  return axios.put(EXERCISES_RESOURCE_URL + '/' + exercise.id, payload);
}

export function getExerciseSourceFiles(id) {
  return axios.get(EXERCISES_RESOURCE_URL + '/' + id + '/source_files');
}
