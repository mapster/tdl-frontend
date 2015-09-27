'use strict';

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ExerciseManagerConstants = require('../../constants/admin/ExercisesManagerConstants');

var ExerciseManagerActions = {
  editExercise: function(exercise) {
    AppDispatcher.handleViewAction({
      actionType: ExerciseManagerConstants.EDIT_EXERCISE,
      data: exercise
    });
  },
  showAddExercise: function(doShow) {
    AppDispatcher.handleViewAction({
      actionType: ExerciseManagerConstants.SHOW_ADD_EXERCISE,
      data: doShow
    });
  },
  dismissAlert: function() {
    AppDispatcher.handleViewAction({
      actionType: ExerciseManagerConstants.SET_ALERT,
      data: false
    });
  },
  setExerciseEditorState: function(state) {
    AppDispatcher.handleViewAction({
      actionType: ExerciseManagerConstants.SET_EXERCISE_EDITOR_STATE,
      data: state
    });
  },
  addExercise: function(exercise) {
    AppDispatcher.handleViewAction({
      actionType: ExerciseManagerConstants.ADD_EXERCISE,
      data: exercise
    });
  }
};

module.exports = ExerciseManagerActions;
