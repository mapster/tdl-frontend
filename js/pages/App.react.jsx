'use strict';

var React = require('react');
var {PropTypes} = React;

var ConnectToStore = require('../mixins/ConnectToStore');
var SessionStore = require('../stores/SessionStore');
var UserStore = require('../stores/UserStore');

var App = React.createClass({
  propTypes: {
    children: PropTypes.node,
    session: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
  },
  mixins: [
    ConnectToStore('session', SessionStore, function(store){return store.getSession();}),
    ConnectToStore('user', UserStore, function(store){return {user: store.getUser(), auth: store.getAuth()};})
  ],
  render: function() {
    return (
      <div className='container'>
        {this.props.children && React.cloneElement(this.props.children, {session: this.state.session, user: this.state.user})}
      </div>
    );
  }
});

module.exports = App;
