import uuid from 'uuid/v4';

import * as type from '../constants/actionTypes';
import * as kind from '../constants/notification';

export function error(message) {
  return {
    type: type.NOTIFICATION,
    data: {
      id: uuid(),
      kind: kind.ERROR,
      message,
    }
  };
}

export const success = message => ({
  type: type.NOTIFICATION,
  data: {
    id: uuid(),
    kind: kind.SUCCESS,
    message
  },
});

export const dismissNotification = ({id}) => ({
  type: type.NOTIFICATION_DISMISS,
  data: {id}
});