import {put} from 'redux-saga/effects';
import * as Notification from '../actions/notification';

export default function handleErrorResponse(status, data = '') {
  switch (status) {
    case 400: return put(Notification.error('Bad request: ' + data));
    case 401: return put(Notification.error('Not logged in'));
    case 403: return put(Notification.error('Forbidden'));
    case 500: return put(Notification.error('Internal server error'));
    default: return put(Notification.error('Unknown error code: ' + status));
  }
}