var React = require('react');

var Actions = require('../actions/SolutionActions');
var ConnectToStore = require('../mixins/ConnectToStore');
var Exercise = require('../components/Exercise.react');
var ExerciseStore = require('../stores/ExerciseStore');
var SolutionEditor = require('../components/SolutionEditor.react');

var Exercises = React.createClass({
  mixins: [
    ConnectToStore('ex', ExerciseStore, function(store) {
      return {
        editorState: store.getSolutionEditorState(),
        exercises: store.getExercises(),
        solutions: store.getSolutions()
      };
    })
  ],
  render: function() {
    var view = false;
    if (this.state.ex.editorState.show) {
      view = (
        <SolutionEditor {...this.state.ex.editorState}
            doClose={Actions.closeEditSolution}
            doCreateNewFile={Actions.createNewFile}
            doRenameSourceFile={Actions.renameSourceFile}
            doSelectSourceFile={Actions.selectSourceFile}
            doUpdateSourceFile={Actions.updateSourceFile}
        />
      );
    } else {
      var exercises = this.state.ex.exercises;
      view = (
        <div>
          {exercises && Object.keys(exercises).map((exID) => (
            <Exercise key={exID} {...exercises[exID]} doEditExercise={() => Actions.editExercise(exercises[exID])} solution={this.state.ex.solutions[exID]} />
          ))}
        </div>
      );
    }
    return view;
  }
});

module.exports = Exercises;
