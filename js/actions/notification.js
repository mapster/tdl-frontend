import * as type from '../constants/actionTypes';
import * as kind from '../constants/notification';

export function error(message) {
  return {
    type: type.NOTIFICATION,
    data: {
      kind: kind.ERROR,
      message,
    }
  };
}