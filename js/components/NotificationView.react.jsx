var React = require('react');
// var PropTypes = React.PropTypes;

var ConnectToStore = require('../mixins/ConnectToStore');
var NotificationActions = require('../actions/NotificationActions');
var NotificationStore = require('../stores/NotificationStore');
var AlertView = require('./AlertView.react');

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
      <AlertView alert={notification} dismiss={NotificationActions.dismissNotification} />
    );
  }

});

module.exports = NotificationView;
