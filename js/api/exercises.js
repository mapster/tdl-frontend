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
  const {id, created_at, updated_at, ...payload} = exercise;
  return axios.put(EXERCISES_RESOURCE_URL + '/' + exercise.id, payload);
}

export function getExerciseSourceFiles(id) {
  return axios.get(EXERCISES_RESOURCE_URL + '/' + id + '/source_files');
}

const onlyModifiableSourceFileFields = ({name, contents}) => ({name, contents});

export function putSourceFile(exerciseId, sourceFile) {
  return axios.put(EXERCISES_RESOURCE_URL + '/' + exerciseId + '/source_files/' + sourceFile.id, onlyModifiableSourceFileFields(sourceFile));
}

export function postSourceFile(exerciseId, sourceFile) {
  return axios.post(EXERCISES_RESOURCE_URL + '/' + exerciseId + '/source_files', onlyModifiableSourceFileFields(sourceFile));
}

export function deleteSourceFile(exerciseId, sourceFileId) {
  return axios.delete(EXERCISES_RESOURCE_URL + '/' + exerciseId + '/source_files/' + sourceFileId);
}