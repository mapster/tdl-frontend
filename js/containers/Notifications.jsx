import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Notification} from 'react-notification';

import {SELECTORS} from '../reducers';
import * as Action from '../actions/notification';

//style={false}
const Notifications = ({notification, dismissNotification}) => {
  if (notification) {
    return (
      <Notification className={`notification-${notification.kind}`}
                    action='Dismiss'
                    style={false}
                    onClick={() => dismissNotification(notification)}
                    isActive={true}
                    message={notification.message}/>
    );
  }
  return false;
};
Notifications.propTypes = {
  notification: PropTypes.object,
  dismissNotification: PropTypes.func.isRequired,
};

export default compose(
  connect(
    (state) => ({
      notification: SELECTORS.notifications.getNotification(state),
    }),
    {
      dismissNotification: Action.dismissNotification
    }
  )
)(Notifications);
