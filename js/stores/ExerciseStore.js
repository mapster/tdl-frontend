'use strict';

var React = require('react/addons');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ExerciseDAO = require('../dao/ExerciseDAO');
var Constants = require('../constants/ExerciseConstants');
var StoreListenBase = require('./StoreListenBase');
var {handlePromise} = require('./PromiseHandlers');

var _exercises = false;
var _solutions = false;
var _exerciseEditorState = {};

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
  getExerciseEditorState: function() {
    return _exerciseEditorState;
  },
  refreshExercises: function() {
    var actionType = Constants.EXERCISES_UPDATE_FROM_SERVER;
    handlePromise(ExerciseDAO.getExercises(), {
      actionType
    }, {
      403: 'Not authorized to fetch exercises.',
      default: (r,s) => 'Could not fetch exercises: '+s
    });
  },
  refreshSolutions: function() {
    var actionType = Constants.SOLUTIONS_UPDATE_FROM_SERVER;
    handlePromise(ExerciseDAO.getSolutions(), {
      actionType
    }, {
      default: (r, s) => 'Could not fetch exercise solutions: '+s
    });
  },
  updateExerciseEditorState: function(state) {
    _exerciseEditorState = _exerciseEditorState || {};
    _exerciseEditorState = React.addons.update(_exerciseEditorState, state);
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
      case Constants.EXERCISES_UPDATE_FROM_SERVER:
        _exercises = action.data;
        ExerciseStore.emitChange();
        break;
      case Constants.SOLUTIONS_UPDATE_FROM_SERVER:
        _solutions = action.data;
        ExerciseStore.emitChange();
        break;
      default:
    }
  }
});

module.exports = ExerciseStore;
