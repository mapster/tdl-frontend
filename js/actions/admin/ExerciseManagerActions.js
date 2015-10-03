'use strict';

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var Constants = require('../../constants/admin/ExerciseManagerConstants');
var ExerciseManagerDAO = require('../../dao/admin/ExerciseManagerDAO');
var {handlePromise} = require('../../stores/PromiseHandlers');

function _updateExerciseEditorState(state) {
  AppDispatcher.handleViewAction({
    actionType: Constants.UPDATE_EDIT_EXERCISE_STATE,
    data: state
  });
}

var ExerciseManagerActions = {
  closeEditExercise: function() {
    _updateExerciseEditorState({show: false});
  },
  createNewExercise: function() {
    _updateExerciseEditorState({show: true, properties: {}, sourceFiles: {}, feedback: {}});
  },
  editExercise: function(exercise) {
    _updateExerciseEditorState({
      show: true, origProperties: exercise, properties: Object.assign({}, exercise, {'@saved': true}), sourceFiles: {}, feedback: {}
    });
    if(exercise.id){
      handlePromise(ExerciseManagerDAO.getExerciseSources(exercise.id), {
        callbacks: [(r) => _updateExerciseEditorState({sourceFiles: r})]
      }, {
        403: 'Not authorized to fetch exercise source files',
        default: (r,s) => 'Could not fetch exercise source files: '+s
      });
    }
  },
  dismissAlert: function() {
    AppDispatcher.handleViewAction({
      actionType: Constants.SET_ALERT,
      data: false
    });
  },
  resetExerciseProperties: function(resetTo) {
    _updateExerciseEditorState({properties: Object.assign({}, resetTo, {'@saved': true})});
  },
  saveExercise: function(id, exercise) {
    var promise = (id === undefined) ? ExerciseManagerDAO.postExercise(exercise) : ExerciseManagerDAO.putExercise(id, exercise);

    handlePromise(promise, {
      actionType: Constants.SAVE_EXERCISE,
      default: 'Exercise properties saved',
      callbacks: [(r) => _updateExerciseEditorState( {origProperties: r, properties: Object.assign({}, r, {'@saved': true})} )]
    }, {
      400: (r) => _updateExerciseEditorState({feedback: JSON.parse(r)}),
      403: 'Not authorized to save exercise properties',
      404: 'Exercise does not exist: ' + JSON.stringify({id: id, name: exercise.name}),
      default: 'Something went wrong when saving exercise'
    });
  },
  updateExerciseProperties: function(properties) {
    properties['@saved'] = false;
    _updateExerciseEditorState({properties});
  }
};

module.exports = ExerciseManagerActions;
