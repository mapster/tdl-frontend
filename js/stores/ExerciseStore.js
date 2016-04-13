'use strict';

var immutableUpdate = require('react-addons-update');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ExerciseDAO = require('../dao/ExerciseDAO');
var Constants = require('../constants/Constants');
var StoreListenBase = require('./StoreListenBase');
var {handlePromise} = require('./PromiseHandlers');

var _exercises = false;
var _solutions = false;
var _solutionEditorState = {};

var ExerciseStore = Object.assign({}, StoreListenBase, {
  getExercises: function() {
    if(!_exercises) {
      this.refreshExercises();
    }
    return _exercises;
  },
  getSolutions: function() {
    if(!_solutions) {
      this.refreshSolutions();
    }
    return _solutions;
  },
  getSolutionEditorState: function() {
    return _solutionEditorState;
  },
  refreshExercises: function() {
    var actionType = Constants.EXERCISES_UPDATE;
    handlePromise(ExerciseDAO.getExercises(), {
      actionType
    }, {
      403: 'Not authorized to fetch exercises.',
      default: (r,s) => 'Could not fetch exercises: '+s
    });
  },
  refreshSolutions: function() {
    var actionType = Constants.SOLUTIONS_UPDATE;
    handlePromise(ExerciseDAO.getSolutions(), {
      actionType
    }, {
      default: (r, s) => 'Could not fetch exercise solutions: '+s
    });
  },
  updateSolutionEditorState: function(state) {
    _solutionEditorState = _solutionEditorState || {};
    _solutionEditorState = immutableUpdate(_solutionEditorState, state);
    this.emitChange();
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  //==============
  // STORE_REFRESH
  //
  if(payload.source === AppDispatcher.STORE_REFRESH){
    switch (action.actionType) {
      case Constants.EXERCISES_UPDATE:
        _exercises = action.data;
        ExerciseStore.emitChange();
        break;
      case Constants.EXERCISE_SOURCES_UPDATE:
        if(_exercises) {
          _exercises[action.id].sourceFiles = action.data;
          ExerciseStore.emitChange();
        }
        break;
      case Constants.SOLUTIONS_UPDATE:
        _solutions = action.data;
        ExerciseStore.emitChange();
        break;
      default:
    }
  }
  //==============
  // VIEW_ACTION
  //
  else if(payload.source === AppDispatcher.VIEW_ACTION) {
    switch (action.actionType) {
      case Constants.UPDATE_EDIT_EXERCISE_STATE:
        ExerciseStore.updateSolutionEditorState(action.data);
        break;
      default:

    }
  }
});

module.exports = ExerciseStore;
