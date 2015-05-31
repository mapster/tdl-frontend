/*jslint node: true */
'use strict';

var React = require('react');
var $ = require('jquery');

var Exercise = require('../components/Exercise.react');

var Exercises = React.createClass({
  getInitialState: function() {
    return {
      data: '{}'
    };
  },
  componentDidMount: function() {
    $.get('http://127.0.0.1/exercise/firmahytte', function(result) {
      if(this.isMounted()) {
        this.setState({data: result});
      }
    }.bind(this));
  },
  render: function() {
    return (
      <div id="exercises">
        <Exercise data={this.state.data} />
      </div>
    );
  }
});

module.exports = Exercises;
