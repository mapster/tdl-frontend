/*jslint node: true */
'use strict';

var React = require('react');
var $ = require('jquery');

var Exercise = require('../components/Exercise.react');

var Exercises = React.createClass({
  getInitialState: function() {
    return {
      exercises: []
    };
  },
  componentDidMount: function() {
    $.get('http://127.0.0.1/exercises', function(result) {
      if(this.isMounted()) {
        this.setState({exercises: result});
      }
    }.bind(this));
  },
  render: function() {
    var exercises = $.map(this.state.exercises,function(ex) {
        return (<Exercise key={ex} name={ex} />);
    });
    return (
      <div id="exercises">
        {exercises}
      </div>
    );
  }
});

module.exports = Exercises;
