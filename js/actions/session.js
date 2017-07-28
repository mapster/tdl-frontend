import * as type from '../constants/actionTypes';

export function getSession() {
  return {
    type: type.SESSION_GET,
  }
}

export function login(username, password) {
  return {
    type: type.SESSION_LOGIN,
    data: {
      username,
      password
    }
  }
}

export function logout() {
  return {
    type: type.SESSION_LOGOUT
  }
}