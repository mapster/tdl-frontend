import axios from 'axios';
import {Host} from '../appconfig';

const EXERCISES_RESOURCE_URL = Host + '/exercises';

const onlyModifiableExerciseFields = ({name, kind, difficulty, description }) => ({name, kind, difficulty, description});

export function getExercises() {
  return axios.get(EXERCISES_RESOURCE_URL);
}

export function getExercise(id) {
  return axios.get(EXERCISES_RESOURCE_URL + '/' + id);
}

export function postExercise(exercise) {
  return axios.post(EXERCISES_RESOURCE_URL, onlyModifiableExerciseFields(exercise));
}

export function putExercise(exercise) {
  return axios.put(EXERCISES_RESOURCE_URL + '/' + exercise.id, onlyModifiableExerciseFields(exercise));
}
export function deleteExercise(id) {
  return axios.delete(EXERCISES_RESOURCE_URL + '/' + id);
}

// source_file sub-resource
//
//

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