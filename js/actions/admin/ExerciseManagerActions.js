'use strict';

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var Constants = require('../../constants/admin/ExerciseManagerConstants');
var ConfirmationActions = require('../ConfirmationActions');
var ExerciseManagerDAO = require('../../dao/admin/ExerciseManagerDAO');
var {handlePromise} = require('../../stores/PromiseHandlers');
var NotificationActions = require('../NotificationActions');

function _updateExerciseEditorState(state) {
  AppDispatcher.handleViewAction({
    actionType: Constants.UPDATE_EDIT_EXERCISE_STATE,
    data: state
  });
}

var ExerciseManagerActions = {
  closeEditExercise: function(properties, sourceFiles) {
    if(properties['@unsaved'] || Object.keys(sourceFiles).some((f) => sourceFiles[f]['@unsaved'])){
      ConfirmationActions.confirmAndDispatch('You will lose all unsaved changes. Are you sure you wish to leave?',{
        actionType: Constants.UPDATE_EDIT_EXERCISE_STATE,
        data: {show: {$set: false}}
      });

    } else {
      _updateExerciseEditorState({show: {$set: false}});
    }
  },
  createNewExercise: function() {
    _updateExerciseEditorState({$merge: {show: true, properties: {}, sourceFiles: {}, newFileId: 1, feedback: {}}});
  },
  createNewFile: function(exercise_id, id) {
    var name = 'unsaved-file-' + id;
    var sourceUpdate = {};
    sourceUpdate[name] = {$set: {exercise_id, name, contents: '', '@unsaved': true}};
    _updateExerciseEditorState({
      newFileId: {$set: id+1},
      selectedSourceFile: {$set: name},
      sourceFiles: sourceUpdate
    });
  },
  editExercise: function(exercise) {
    _updateExerciseEditorState({$merge: {
      feedback: {},
      newFileId: 1,
      origProperties: exercise,
      properties: Object.assign({}, exercise, {'@unsaved': false}),
      show: true,
      selectedSourceFile: '',
      sourceFiles: {},
      tab: 'properties'
    }});
    if(exercise.id){
      handlePromise(ExerciseManagerDAO.getExerciseSources(exercise.id), {
        callbacks: [(r) => _updateExerciseEditorState({sourceFiles: {$set: r}, selectedSourceFile: {$set: Object.keys(r)[0]}}) ]
      }, {
        403: 'Not authorized to fetch exercise source files',
        default: (r,s) => 'Could not fetch exercise source files: '+s
      });
    }
  },
  deleteExercise: function(ex) {
    console.log('delete: '+ex.name);
  },
  deleteSourceFile: function(name, sourceFiles) {
    ConfirmationActions.confirmAndInvoke("Are you sure you wish to delete " + name +"?", function() {
      var file = sourceFiles[name];
      delete sourceFiles[name];
      var stateUpdate = {sourceFiles: {$set: sourceFiles}};

      if(file.id === undefined) {
        _updateExerciseEditorState(stateUpdate);
        NotificationActions.dispatchNotification("Unsaved source file deleted: " + name);
      } else {
        var promise = ExerciseManagerDAO.deleteSourceFile(file.exercise_id, file.id);
        handlePromise(promise, {
          actionType: Constants.DELETE_SOURCE_FILE,
          default: 'Source file deleted: ' + name,
          callbacks: [() => _updateExerciseEditorState(stateUpdate)]
        }, {
          403: 'Not authorized to delete source file in exercise: ' + name,
          default: 'Something went wrong when deleting source file: ' + name
        });
      }
    });
  },
  renameSourceFile: function(oldName, newName, sourceFiles) {
    sourceFiles[newName] = sourceFiles[oldName];
    delete sourceFiles[oldName];
    sourceFiles[newName].name = newName;
    sourceFiles[newName]['@unsaved'] = true;

    _updateExerciseEditorState({sourceFiles: {$set: sourceFiles}, selectedSourceFile: {$set: newName}});
  },
  resetExerciseProperties: function(resetTo) {
    _updateExerciseEditorState({properties: {$set: Object.assign({}, resetTo, {'@unsaved': false})}});
  },
  saveExerciseProperties: function(id, exercise) {
    var promise = (id === undefined) ? ExerciseManagerDAO.postExercise(exercise) : ExerciseManagerDAO.putExercise(id, exercise);

    handlePromise(promise, {
      actionType: Constants.SAVE_EXERCISE,
      default: 'Exercise properties saved',
      callbacks: [(r) => _updateExerciseEditorState({
        origProperties: {$set: r},
        properties: {$set: Object.assign({}, r, {'@unsaved': false}) }
      })]
    }, {
      400: (r) => _updateExerciseEditorState({feedback: {$set: JSON.parse(r)}}),
      403: 'Not authorized to save exercise properties',
      404: 'Exercise does not exist: ' + JSON.stringify({id: id, name: exercise.name}),
      default: 'Something went wrong when saving exercise'
    });
  },
  saveSourceFile: function(sourceFile) {
    var {id, exercise_id, name, contents} = sourceFile;
    if(name.startsWith('unsaved-file-')) {
      NotificationActions.dispatchNotification("Please give the source file a name before saving", "warning");
    } else {
      var promise = (sourceFile.id === undefined) ?
        ExerciseManagerDAO.postSourceFile(exercise_id, {name, contents}) :
        ExerciseManagerDAO.putSourceFile(exercise_id, id, {name, contents});

      handlePromise(promise, {
        actionType: Constants.SAVE_SOURCE_FILE,
        default: 'Source file saved',
        callbacks: [function(file) {
          var sourceFiles = {};
          sourceFiles[name] = {$set: file};
          _updateExerciseEditorState({sourceFiles});
        }]
      }, {
        403: 'Not authorized to save source file to exercise',
        default: 'Something went wrong when saving source file'
      });
    }
  },
  selectSourceFile: function(name) {
    _updateExerciseEditorState({selectedSourceFile: {$set: name}});
  },
  setEditorTab: function(tab) {
    _updateExerciseEditorState({tab: {$set: tab}});
  },
  updateExerciseProperties: function(properties) {
    properties['@unsaved'] = true;
    _updateExerciseEditorState({properties: {$set: properties}});
  },
  updateSourceFile: function(name, contents) {
    var sourceUpdate = {};
    sourceUpdate[name] = {contents: {$set: contents}, '@unsaved': {$set: true}};
    _updateExerciseEditorState({sourceFiles: sourceUpdate});
  }
};

module.exports = ExerciseManagerActions;
