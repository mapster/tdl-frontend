var React = require('react');
var immutableUpdate = require('react-addons-update');
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ExerciseManagerDAO = require('../../dao/admin/ExerciseManagerDAO');
var Constants = require('../../constants/admin/ExerciseManagerConstants');
var StoreListenBase = require('../StoreListenBase');
var {handlePromise} = require('../PromiseHandlers');

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
    var actionType = Constants.EXERCISES_UPDATE_FROM_SERVER;
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
      case Constants.SET_ALERT:
        ExerciseManagerStore.setAlert(action.data);
        break;
      case Constants.UPDATE_EDIT_EXERCISE_STATE:
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
      case Constants.EXERCISES_UPDATE_FROM_SERVER:
        _exercises = action.data;
        ExerciseManagerStore.emitChange();
        break;
      case Constants.SAVE_EXERCISE:
        ExerciseManagerStore.refreshExercises();
        break;
      case Constants.DELETE_EXERCISE:
        ExerciseManagerStore.refreshExercises();
        break;
      default:
    }
  }
  //==============
  // ERROR_RESPONSE
  //
  else if(payload.source === AppDispatcher.ERROR_RESPONSE) {
    switch (action.actionType) {
      case Constants.SAVE_EXERCISE:
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
