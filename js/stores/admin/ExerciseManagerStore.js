'use strict';

var assign = require('object-assign');

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ExerciseManagerDAO = require('../../dao/admin/ExerciseManagerDAO');
var Constants = require('../../constants/admin/ExerciseManagerConstants');
var StoreListenBase = require('../StoreListenBase');
var PromiseHandlers = require('../PromiseHandlers');

var _alert = false;
var _exercises = false;
var _exerciseEditorState = false;

var ExerciseManagerStore = assign({}, StoreListenBase, {
  getAlert: function() {
    return _alert;
  },
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
    ExerciseManagerDAO.getExercises()
      .then(PromiseHandlers.handleSuccess.bind(null, actionType))
      .catch(PromiseHandlers.handleNotFound.bind(null, [], actionType));
  },
  setAlert: function(alert) {
    _alert = alert;
    this.emitChange();
  },
  setExerciseEditorState: function(state) {
    _exerciseEditorState = state;
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
      case Constants.SET_EXERCISE_EDITOR_STATE:
        ExerciseManagerStore.setExerciseEditorState(action.data);
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
        alert = Object.assign({}, action);
        alert.userMsg = 'Successfully saved';
        ExerciseManagerStore.setAlert(alert);
        ExerciseManagerStore.setExerciseEditorState(Object.assign({}, _exerciseEditorState, {properties: action.data}));
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
        ExerciseManagerStore.setAlert(alert);
        break;
      default:
    }
  }
});

module.exports = ExerciseManagerStore;
