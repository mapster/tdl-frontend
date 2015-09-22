'use strict';

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ExercisesConstants = require('../../constants/admin/ExercisesConstants');

var ExerciseManagerActions = {
  showAddExercise: function(doShow) {
    AppDispatcher.handleViewAction({
      actionType: ExercisesConstants.SHOW_ADD_EXERCISE,
      data: doShow
    });
  }
};

module.exports = ExerciseManagerActions;
