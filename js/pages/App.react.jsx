'use strict';

var React = require('react');

var SessionStore = require('../stores/SessionStore');

function _getState() {
  return {
    session: SessionStore.getSession()
  };
}

function _onChange(store, callback) {
  var stateChange = {};
  stateChange[store] = callback();
  this.setState(stateChange);
}

var App = React.createClass({
  _listeners: {},
  getInitialState: function() {
    return _getState();
  },
  componentDidMount: function() {
    this._listeners.session = _onChange.bind(this, 'session', SessionStore.getSession);
    SessionStore.addChangeListener(this._listeners.session);
  },
  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._listeners.session);
  },
  render: function() {
    return (
      <div className='container'>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
