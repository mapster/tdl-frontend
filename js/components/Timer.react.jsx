/*jslint node: true */
'use strict';

var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {start: new Date().getTime()};
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 50);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  tick: function() {
    var elapsed = Math.round((new Date().getTime() - this.state.start) / 100);
    this.setState({seconds: elapsed / 10 + (elapsed % 10 ? '' : '.0')});
  },
  render: function() {
    return (<div className="timer">{this.state.seconds}</div>);
  }
});
