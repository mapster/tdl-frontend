var React = require('react');
// var PropTypes = React.PropTypes;
var {Alert} = require('react-bootstrap');

var ConnectToStore = require('../mixins/ConnectToStore');
var NotificationActions = require('../actions/NotificationActions');
var NotificationStore = require('../stores/NotificationStore');

var NotificationView = React.createClass({
  mixins: [
    ConnectToStore('notification', NotificationStore, (store) => store.getNotification())
  ],

  render: function() {
    var notification = this.state.notification;
    if(!notification) {
      return false;
    }
    return (
      <Alert bsStyle={notification.type} onDismiss={NotificationActions.dismissNotification}>{notification.text}</Alert>
    );
  }

});

module.exports = NotificationView;
