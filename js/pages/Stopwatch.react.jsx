'use strict';

var React = require('react');

var Timer = require('../components/Timer.react');

var Stopwatch = React.createClass({
  render: function() {
    return (
      <div>
        <h2>En stoppeklokke: </h2>
        <Timer />
      </div>
    );
  }
});

module.exports = Stopwatch;
