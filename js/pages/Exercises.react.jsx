/*jslint node: true */
'use strict';

var React = require('react');
var $ = require('jquery');
var {Accordion} = require('react-bootstrap');

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
    }.bind(this))
    .fail(function() {
        this.setState({exercises: []});
    }.bind(this));
  },
  render: function() {
    var exercises = $.map(this.state.exercises,function(ex) {
        return (<Exercise key={ex} name={ex} />);
    });
    return (
      <div>
        {exercises}
      </div>
    );
  }
});

module.exports = Exercises;
