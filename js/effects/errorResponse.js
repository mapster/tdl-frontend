import {put} from 'redux-saga/effects';

export default function handleErrorResponse(status) {
  switch (status) {
    case 401: return put(Notification.error('Not logged in'));
    case 403: return put(Notification.error('Forbidden'));
    case 500: return put(Notification.error('Internal server error'));
    default: return put(Notification.error('Unknown error code: ' + status));
  }
}