var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var ConfirmationActions = require('./ConfirmationActions');
var ExerciseDAO = require('../dao/ExerciseDAO');
var NotificationActions = require('./NotificationActions');
var {handlePromise} = require('../stores/PromiseHandlers');

function _updateSolutionEditorState(state) {
  AppDispatcher.handleViewAction({
    actionType: Constants.UPDATE_EDIT_EXERCISE_STATE,
    data: state
  });
}

var SolutionActions = {
  closeEditSolution: function(sourceFiles) {
    if(Object.keys(sourceFiles).some((f) => sourceFiles[f]['@unsaved'])){
      ConfirmationActions.confirmAndDispatch('You will lose all unsaved changes. Are you sure you wish to leave?',{
        actionType: Constants.UPDATE_EDIT_EXERCISE_STATE,
        data: {show: {$set: false}}
      });

    } else {
      _updateSolutionEditorState({show: {$set: false}});
    }
  },
  createNewFile: function(exercise_id, id) {
    var name = 'unsaved-file-' + id;
    var sourceUpdate = {};
    sourceUpdate[name] = {$set: {exercise_id, name, contents: '', '@unsaved': true}};
    _updateSolutionEditorState({
      newFileId: {$set: id+1},
      selectedSourceFile: {$set: name},
      sourceFiles: sourceUpdate
    });
  },
  editExercise: function(exercise) {
    _updateSolutionEditorState({$merge: {
      feedback: {},
      newFileId: 1,
      properties: exercise,
      show: true,
      selectedSourceFile: '',
      sourceFiles: {}
    }});
    if(exercise.id){
      handlePromise(ExerciseDAO.getExerciseSources(exercise.id), {
        callbacks: [(r) => {
          Object.keys(r).forEach((name) => r[name]['@readOnly'] = true);
          _updateSolutionEditorState({sourceFiles: {$set: r}, selectedSourceFile: {$set: Object.keys(r)[0]}});
        }]
      }, {
        default: (r,s) => 'Could not fetch exercise source files: '+s
      });
    }
  },
  renameSourceFile: function(oldName, newName, sourceFiles) {
    if(sourceFiles[newName]) {
      NotificationActions.dispatchNotification('File already exist: ' + newName, 'danger');
    } else {
      sourceFiles[newName] = sourceFiles[oldName];
      delete sourceFiles[oldName];
      sourceFiles[newName].name = newName;
      sourceFiles[newName]['@unsaved'] = true;

      _updateSolutionEditorState({sourceFiles: {$set: sourceFiles}, selectedSourceFile: {$set: newName}});
    }
  },
  saveSourceFile: function(sourceFile) {
    var {id, exercise_id, name, contents} = sourceFile;
    if(name.startsWith('unsaved-file-')) {
      NotificationActions.dispatchNotification('Please give the source file a name before saving', 'warning');
    } else {
      var promise = (sourceFile.id === undefined) ?
        ExerciseDAO.postSourceFile(exercise_id, {name, contents}) :
        ExerciseDAO.putSourceFile(exercise_id, id, {name, contents});

      handlePromise(promise, {
        actionType: Constants.SAVE_SOURCE_FILE,
        default: 'Source file saved',
        callbacks: [function(file) {
          var sourceFiles = {};
          sourceFiles[name] = {$set: file};
          _updateSolutionEditorState({sourceFiles});
        }]
      }, {
        403: 'Not authorized to save source file to exercise',
        default: 'Something went wrong when saving source file'
      });
    }
  },
  selectSourceFile: function(name) {
    _updateSolutionEditorState({selectedSourceFile: {$set: name}});
  },
  updateSourceFile: function(name, contents) {
    var sourceUpdate = {};
    sourceUpdate[name] = {contents: {$set: contents}, '@unsaved': {$set: true}};
    _updateSolutionEditorState({sourceFiles: sourceUpdate});
  }
};

module.exports = SolutionActions;
