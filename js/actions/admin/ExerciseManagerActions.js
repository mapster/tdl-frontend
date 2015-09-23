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
  setExerciseEditorState: function(state) {
    AppDispatcher.handleViewAction({
      actionType: ExercisesConstants.SET_EXERCISE_EDITOR_STATE,
      data: state 
    });
  }
};

module.exports = ExerciseManagerActions;
