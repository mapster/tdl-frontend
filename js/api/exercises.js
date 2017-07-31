import axios from 'axios';
import {Host} from '../appconfig';

const EXERCISES_RESOURCE_URL = Host + '/exercises';

export function getExercises() {
  return axios.get(EXERCISES_RESOURCE_URL);
}