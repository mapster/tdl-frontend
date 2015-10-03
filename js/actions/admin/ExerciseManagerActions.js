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
    _updateExerciseEditorState({show: {$set: false}});
  },
  createNewExercise: function() {
    _updateExerciseEditorState({$merge: {show: true, properties: {}, sourceFiles: {}, newFileId: 1, feedback: {}}});
  },
  createNewFile: function(id) {
    var name = 'unsaved-file-' + id;
    var sourceUpdate = {};
    sourceUpdate[name] = {$set: {name, contents: ''}};
    _updateExerciseEditorState({
      sourceFiles: sourceUpdate,
      newFileId: {$set: id+1}
    });
  },
  editExercise: function(exercise) {
    _updateExerciseEditorState({$merge: {
      show: true, origProperties: exercise, properties: Object.assign({}, exercise, {'@saved': true}), sourceFiles: {}, newFileId: 1, feedback: {}
    }});
    if(exercise.id){
      handlePromise(ExerciseManagerDAO.getExerciseSources(exercise.id), {
        callbacks: [(r) => _updateExerciseEditorState({sourceFiles: {$set: r}}) ]
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
    _updateExerciseEditorState({properties: {$set: Object.assign({}, resetTo, {'@saved': true})}});
  },
  saveExerciseProperties: function(id, exercise) {
    var promise = (id === undefined) ? ExerciseManagerDAO.postExercise(exercise) : ExerciseManagerDAO.putExercise(id, exercise);

    handlePromise(promise, {
      actionType: Constants.SAVE_EXERCISE,
      default: 'Exercise properties saved',
      callbacks: [(r) => _updateExerciseEditorState({
        origProperties: {$set: r},
        properties: {$set: Object.assign({}, r, {'@saved': true}) }
      })]
    }, {
      400: (r) => _updateExerciseEditorState({feedback: {$set: JSON.parse(r)}}),
      403: 'Not authorized to save exercise properties',
      404: 'Exercise does not exist: ' + JSON.stringify({id: id, name: exercise.name}),
      default: 'Something went wrong when saving exercise'
    });
  },
  setEditorTab: function(tab) {
    _updateExerciseEditorState({tab: {$set: tab}});
  },
  updateExerciseProperties: function(properties) {
    properties['@saved'] = false;
    _updateExerciseEditorState({properties: {$set: properties}});
  },
  updateSourceFile: function(name, contents) {
    var sourceUpdate = {};
    sourceUpdate[name] = {contents: {$set: contents}};
    _updateExerciseEditorState({sourceFiles: sourceUpdate});
  }
};

module.exports = ExerciseManagerActions;
