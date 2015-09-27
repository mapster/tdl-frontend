'use strict';

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ExerciseManagerConstants = require('../../constants/admin/ExerciseManagerConstants');

var ExerciseManagerActions = {
  editExercise: function(exercise) {
    AppDispatcher.handleViewAction({
      actionType: ExerciseManagerConstants.EDIT_EXERCISE,
      data: exercise
    });
  },
  dismissAlert: function() {
    AppDispatcher.handleViewAction({
      actionType: ExerciseManagerConstants.SET_ALERT,
      data: false
    });
  },
  saveExercise: function(id, exercise) {
    AppDispatcher.handleViewAction({
      actionType: ExerciseManagerConstants.SAVE_EXERCISE,
      data: exercise,
      id: id
    });
  },
  setExerciseEditorState: function(state) {
    AppDispatcher.handleViewAction({
      actionType: ExerciseManagerConstants.SET_EXERCISE_EDITOR_STATE,
      data: state
    });
  }
};

module.exports = ExerciseManagerActions;
