'use strict';

var assign = require('object-assign');

var AppDispatcher = require('../../dispatcher/AppDispatcher');
//var UsersDAO = require('../../dao/admin/UsersDAO');
var ExercisesConstants = require('../../constants/admin/ExercisesConstants');
// var SessionConstants = require('../../constants/SessionConstants');
var StoreListenBase = require('../StoreListenBase');
var PromiseHandlers = require('../PromiseHandlers');

var _showAddExercise = false;

var ExerciseManagerStore = assign({}, StoreListenBase, {
  showAddExercise: function() {
    return _showAddExercise;
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  if(payload.source == AppDispatcher.VIEW_ACTION) {
    switch (action.actionType) {
      case ExercisesConstants.SHOW_ADD_EXERCISE:
        _showAddExercise = action.data;
        ExerciseManagerStore.emitChange();
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
