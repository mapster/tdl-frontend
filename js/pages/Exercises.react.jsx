'use strict';

var React = require('react');

var ConnectToStore = require('../mixins/ConnectToStore');
var Exercise = require('../components/Exercise.react');
var ExerciseStore = require('../stores/ExerciseStore');

var Exercises = React.createClass({
  mixins: [
    ConnectToStore('ex', ExerciseStore, function(store) {
      return {
        editorState: store.getExerciseEditorState(),
        exercises: store.getExercises(),
        solutions: store.getSolutions()
      };
    })
  ],
  render: function() {
    var exercises = this.state.ex.exercises;
    return (
      <div>
        {exercises && Object.keys(exercises).map((exID) => (
          <Exercise key={exID} {...exercises[exID]} solution={this.state.ex.solutions[exID]} />
        ))}
      </div>
    );
  }
});

module.exports = Exercises;
