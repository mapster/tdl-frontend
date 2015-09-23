'use strict';

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ExercisesConstants = require('../../constants/admin/ExercisesConstants');

var ExerciseManagerActions = {
  showAddExercise: function(doShow) {
    AppDispatcher.handleViewAction({
      actionType: ExercisesConstants.SHOW_ADD_EXERCISE,
      data: doShow
    });
  },
  dismissAlert: function() {
    AppDispatcher.handleViewAction({
      actionType: ExercisesConstants.SET_ALERT,
      data: false
    });
  },
  setExerciseEditorState: function(state) {
    AppDispatcher.handleViewAction({
      actionType: ExercisesConstants.SET_EXERCISE_EDITOR_STATE,
      data: state
    });
  },
  addExercise: function(exercise) {
    AppDispatcher.handleViewAction({
      actionType: ExercisesConstants.ADD_EXERCISE,
      data: exercise
    });
  }
};

module.exports = ExerciseManagerActions;
