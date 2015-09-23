'use strict';

var assign = require('object-assign');

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ExerciseManagerDAO = require('../../dao/admin/ExerciseManagerDAO');
var ExercisesConstants = require('../../constants/admin/ExercisesConstants');
var ResponseConstants = require('../../constants/ResponseConstants');
var StoreListenBase = require('../StoreListenBase');
var PromiseHandlers = require('../PromiseHandlers');

var _showAddExercise = false;
var _exerciseEditorState = {};
var _alert = false;

var ExerciseManagerStore = assign({}, StoreListenBase, {
  getAlert: function() {
    return _alert;
  },
  getExerciseEditorState: function() {
    return _exerciseEditorState;
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
  if(payload.source == AppDispatcher.VIEW_ACTION) {
    switch (action.actionType) {
      case ExercisesConstants.ADD_EXERCISE:
        var resultAction = ExercisesConstants.ADD_USER;
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
                //also set field alerts
                var state = ExerciseManagerStore.getExerciseEditorState();
                state.properties.errors = e.messages;
                ExerciseManagerStore.setExerciseEditorState(state);
                break;
              default:
            }
            ExerciseManagerStore.setAlert(alert);
          }));
        break;
      case ExercisesConstants.SET_ALERT:
        ExerciseManagerStore.setAlert(action.data);
        break;
      case ExercisesConstants.SHOW_ADD_EXERCISE:
        _showAddExercise = action.data;
        ExerciseManagerStore.emitChange();
        break;
      case ExercisesConstants.SET_EXERCISE_EDITOR_STATE:
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
      default:
    }
  }
});

module.exports = ExerciseManagerStore;
