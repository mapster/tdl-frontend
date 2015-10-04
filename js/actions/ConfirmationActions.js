'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

function _updateConfirmationState(state) {
  AppDispatcher.handleViewAction({
    actionType: Constants.SET_CONFIRMATION,
    data: state
  });
}

var ConfirmationActions = {
  requestConfirmation: function(text, todoAction) {
    _updateConfirmationState({show: true, text: text, todoAction});
  },
  cancel: function() {
    _updateConfirmationState({show: false, text: ''});
  },
  confirm: function(todoAction) {
    AppDispatcher.handleViewAction(todoAction);
    _updateConfirmationState({show: false, text: ''});
  }
};

module.exports = ConfirmationActions;
