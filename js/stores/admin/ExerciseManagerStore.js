var React = require('react');
var immutableUpdate = require('react-addons-update');
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ExerciseManagerDAO = require('../../dao/admin/ExerciseManagerDAO');
var StoreListenBase = require('../StoreListenBase');
var {handlePromise} = require('../PromiseHandlers');
var EMConstants = require('../../constants/admin/ExerciseManagerConstants');
var Constants = require('../../constants/Constants');

var _exercises;
var _exerciseEditorState = {};

var ExerciseManagerStore = Object.assign({}, StoreListenBase, {
  getExercises: function() {
    if(!_exercises) {
      this.refreshExercises();
    }
    return _exercises;
  },
  getExerciseEditorState: function() {
    return _exerciseEditorState;
  },
  refreshExercises: function() {
    var actionType = EMConstants.EXERCISES_UPDATE_FROM_SERVER;
    handlePromise(ExerciseManagerDAO.getExercises(), {
      actionType
    }, {
      403: 'Not authorized to fetch exercises.',
      default: (r,s) => 'Could not fetch exercises: '+s
    });
  },
  updateExerciseEditorState: function(state) {
    _exerciseEditorState = _exerciseEditorState || {};
    _exerciseEditorState = immutableUpdate(_exerciseEditorState, state);
    this.emitChange();
  }
});

AppDispatcher.register(function(payload) {
  var alert;
  var action = payload.action;
  if(payload.source === AppDispatcher.VIEW_ACTION) {
    switch (action.actionType) {
      //TODO should be looked into, setAlert doesn't exist any more
      case EMConstants.SET_ALERT:
        ExerciseManagerStore.setAlert(action.data);
        break;
      case EMConstants.UPDATE_EDIT_EXERCISE_STATE:
        ExerciseManagerStore.updateExerciseEditorState(action.data);
        break;
      default:
    }
  }
  //==============
  // STORE_REFRESH
  //
  else if(payload.source === AppDispatcher.STORE_REFRESH){
    switch (action.actionType) {
      case EMConstants.EXERCISES_UPDATE_FROM_SERVER:
        _exercises = action.data;
        ExerciseManagerStore.emitChange();
        break;
      case EMConstants.SAVE_EXERCISE:
        ExerciseManagerStore.refreshExercises();
        break;
      case EMConstants.DELETE_EXERCISE:
        ExerciseManagerStore.refreshExercises();
        break;
      case Constants.EXERCISE_SOURCES_UPDATE:
        if(_exercises) {
          _exercises[action.id].source_files = action.data;
          ExerciseManagerStore.emitChange();
        }
        break;
      default:
    }
  }
  //==============
  // ERROR_RESPONSE
  //
  else if(payload.source === AppDispatcher.ERROR_RESPONSE) {
    switch (action.actionType) {
      case EMConstants.SAVE_EXERCISE:
        alert = Object.assign({}, action);
        alert.userMsg = 'Could not save exercise: ' + alert.status;
        //TODO should be looked into, setAlert doesn't exist any more
        ExerciseManagerStore.setAlert(alert);
        break;
      default:
    }
  }
});

module.exports = ExerciseManagerStore;
