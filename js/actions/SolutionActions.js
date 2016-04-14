var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var SolutionConstants = require('../constants/SolutionEditor');
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
      selectedSolutionSourceFile: {$set: name},
      sourceFiles: sourceUpdate
    });
  },
  deleteSourceFile: function(name, sourceFiles) {
    ConfirmationActions.confirmAndInvoke('Are you sure you wish to delete ' + name +'?', function() {
      var stateUpdate = {};

      // find new selectedSolutionSourceFile
      var sourceFilesNames = Object.keys(sourceFiles);
      var index = sourceFilesNames.indexOf(name);
      index = (index < sourceFilesNames.length-1 ? index + 1 : index -1);
      if(index >= 0) {
        stateUpdate.selectedSolutionSourceFile = {$set: sourceFilesNames[index]};
      }
      var file = sourceFiles[name];
      delete sourceFiles[name];
      stateUpdate.sourceFiles = {$set: sourceFiles};

      if(file.id === undefined) {
        _updateSolutionEditorState(stateUpdate);
        NotificationActions.dispatchNotification('Unsaved source file deleted: ' + name);
      } else {
        handlePromise(ExerciseDAO.deleteSolutionSourceFile(file), {
          default: () => _updateSolutionEditorState(stateUpdate)
        });
      }
    });
  },
  editExercise: function(exercise) {
    _updateSolutionEditorState({$merge: {
      feedback: {},
      newFileId: 1,
      properties: exercise,
      show: true,
      selectedExerciseSourceFile: '',
      selectedSolutionSourceFile: '',
      sourceFiles: {},
      tab: SolutionConstants.TAB_SOLUTION_SOURCES
    }});
    if(exercise.id){
      handlePromise(ExerciseDAO.getExerciseSources(exercise.id), {
        default: [(r) => SolutionActions.selectExerciseSourceFile(Object.keys(r)[0])]
      });
      handlePromise(ExerciseDAO.getSolutionSources(exercise.id), {
        default: [(r) => _updateSolutionEditorState({sourceFiles: {$set: r}, selectedSolutionSourceFile: {$set: Object.keys(r)[0]}})]
      });
      ExerciseDAO.getSolveAttempts(exercise.id);
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
      SolutionActions.saveSourceFile(sourceFiles[newName]);
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
  selectExerciseSourceFile: function(name) {
    _updateSolutionEditorState({selectedExerciseSourceFile: {$set: name}});
  },
  selectSolutionSourceFile: function(name) {
    _updateSolutionEditorState({selectedSolutionSourceFile: {$set: name}});
  },
  setEditorTab: function(tab) {
    _updateSolutionEditorState({tab: {$set: tab}});
  },
  testSolution: function(exerciseId, sourceFiles) {
    ExerciseDAO.postSolveAttempt(exerciseId, sourceFiles);
  },
  updateSourceFile: function(name, contents) {
    var sourceUpdate = {};
    sourceUpdate[name] = {contents: {$set: contents}, '@unsaved': {$set: true}};
    _updateSolutionEditorState({sourceFiles: sourceUpdate});
  }
};

module.exports = SolutionActions;
