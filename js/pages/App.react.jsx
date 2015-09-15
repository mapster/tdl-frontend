'use strict';

var React = require('react');
var {PropTypes} = React;

var ConnectToStore = require('../mixins/ConnectToStore');
var SessionStore = require('../stores/SessionStore');

var App = React.createClass({
  propTypes: {
    children: PropTypes.node,
    session: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
  },
  mixins: [ConnectToStore('session', SessionStore, function(store){return store.getSession();})],
  render: function() {
    return (
      <div className='container'>
        {React.cloneElement(this.props.children, {session: this.state.session})}
      </div>
    );
  }
});

module.exports = App;
