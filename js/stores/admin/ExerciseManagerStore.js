'use strict';

var assign = require('object-assign');

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ExerciseManagerDAO = require('../../dao/admin/ExerciseManagerDAO');
var ExerciseManagerConstants = require('../../constants/admin/ExerciseManagerConstants');
var ResponseConstants = require('../../constants/ResponseConstants');
var StoreListenBase = require('../StoreListenBase');
var PromiseHandlers = require('../PromiseHandlers');

var _alert = false;
var _exercises = false;
var _exerciseEditorState = false;
var _showAddExercise = false;

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
    var actionType = ExerciseManagerConstants.EXERCISES_UPDATE_FROM_SERVER;
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
  },
  showAddExercise: function() {
    return _showAddExercise;
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  var resultAction;
  if(payload.source == AppDispatcher.VIEW_ACTION) {
    switch (action.actionType) {
      case ExerciseManagerConstants.ADD_EXERCISE:
        resultAction = ExerciseManagerConstants.ADD_EXERCISE;
        ExerciseManagerDAO.postExercise(action.data)
          .then(function(response) {
            PromiseHandlers.handleSuccess(resultAction, response);
            ExerciseManagerStore.setAlert({text: 'Exercise properties saved', type: 'success'});
          })
          .catch(PromiseHandlers.handleError.bind(null, function(e) {
            var alert = {type: 'danger'};
            switch (e.type) {
              case ResponseConstants.INVALID_DATA:
                alert.text = 'Could not save the exercise properties';
                //set field alerts
                var state = ExerciseManagerStore.getExerciseEditorState();
                state.properties.errors = e.messages;
                ExerciseManagerStore.setExerciseEditorState(state);
                break;
              default:
            }
            ExerciseManagerStore.setAlert(alert);
          }));
        break;
      case ExerciseManagerConstants.EDIT_EXERCISE:
        ExerciseManagerStore.setExerciseEditorState({properties: action.data});
        resultAction = ExerciseManagerConstants.EDIT_EXERCISE_SOURCES_UPDATE_FROM_SERVER;
        ExerciseManagerDAO.getExerciseSources(action.data.id)
          .then(PromiseHandlers.handleSuccess.bind(null, resultAction))
          .catch(PromiseHandlers.handleNotFound.bind(null, {}, resultAction));
        break;
      case ExerciseManagerConstants.SET_ALERT:
        ExerciseManagerStore.setAlert(action.data);
        break;
      case ExerciseManagerConstants.SHOW_ADD_EXERCISE:
        _showAddExercise = action.data;
        ExerciseManagerStore.emitChange();
        break;
      case ExerciseManagerConstants.SET_EXERCISE_EDITOR_STATE:
        ExerciseManagerStore.setExerciseEditorState(action.data);
        break;
      default:
    }
  }
  //==============
  // STORE_REFRESH
  //
  else if(payload.source == AppDispatcher.STORE_REFRESH){
    switch (action.actionType) {
      case ExerciseManagerConstants.EDIT_EXERCISE_SOURCES_UPDATE_FROM_SERVER:
        ExerciseManagerStore.setExerciseEditorState(Object.assign(_exerciseEditorState, {sourceFiles: action.data}));
        break;
      case ExerciseManagerConstants.EXERCISES_UPDATE_FROM_SERVER:
        _exercises = action.data;
        ExerciseManagerStore.emitChange();
        break;
      default:
    }
  }
});

module.exports = ExerciseManagerStore;
