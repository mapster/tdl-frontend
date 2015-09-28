'use strict';

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var Constants = require('../../constants/admin/ExerciseManagerConstants');
var ExerciseManagerDAO = require('../../dao/admin/ExerciseManagerDAO');
var PromiseHandlers = require('../../stores/PromiseHandlers').factory;

var ExerciseManagerActions = {
  editExercise: function(exercise) {
    var state = {properties: exercise};
    this.setExerciseEditorState(state);
    if(exercise.id){
      ExerciseManagerDAO.getExerciseSources(exercise.id)
        .then((response) => this.setExerciseEditorState(Object.assign(state, {sourceFiles: response})))
        .catch(PromiseHandlers.handleErrorResponse(Constants.EXERCISE_SOURCES_UPDATE_FROM_SERVER));
    }
  },
  dismissAlert: function() {
    AppDispatcher.handleViewAction({
      actionType: Constants.SET_ALERT,
      data: false
    });
  },
  saveExercise: function(id, exercise) {
    var doThen = PromiseHandlers.handleSuccess(Constants.SAVE_EXERCISE);
    var doCatch = PromiseHandlers.handleErrorResponse(Constants.SAVE_EXERCISE);

    if(id === undefined) {
      ExerciseManagerDAO.postExercise(exercise).then(doThen).catch(doCatch);
    } else {
      ExerciseManagerDAO.putExercise(id, exercise).then(doThen).catch(doCatch);
    }
  },
  setExerciseEditorState: function(state) {
    AppDispatcher.handleViewAction({
      actionType: Constants.SET_EXERCISE_EDITOR_STATE,
      data: state
    });
  }
};

module.exports = ExerciseManagerActions;
