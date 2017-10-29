import axios from 'axios';
import {Host} from '../appconfig';

const SESSION_RESOURCE_URL = Host + '/user_session';

export function login(email, password) {
  return axios.post(SESSION_RESOURCE_URL, {
    email,
    password
  });
}

export function logout() {
  return axios.delete(SESSION_RESOURCE_URL);
}

export function getSession() {
  return axios.get(SESSION_RESOURCE_URL);
}