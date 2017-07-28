import axios from 'axios';
import {Host} from '../appconfig';

const RESOURCE_URL = Host + '/user_session';

export function login(email, password) {
  return axios.post(RESOURCE_URL, {
    email,
    password
  });
}

export function logout() {
  return axios.delete(RESOURCE_URL);
}

export function getSession() {
  return axios.get(RESOURCE_URL);
}