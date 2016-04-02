var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

function _updateConfirmationState(state) {
  AppDispatcher.handleViewAction({
    actionType: Constants.SET_CONFIRMATION,
    data: state
  });
}

var ConfirmationActions = {
  confirmAndDispatch: function(text, todoAction) {
    _updateConfirmationState({show: true, text, todoAction});
  },
  confirmAndInvoke: function(text, todoCallback) {
    _updateConfirmationState({show: true, text, todoCallback});
  },
  cancel: function() {
    _updateConfirmationState({show: false, text: ''});
  },
  confirm: function(confirmationState) {
    var {todoAction, todoCallback} = confirmationState;
    if(todoAction) {
      AppDispatcher.handleViewAction(todoAction);
    }
    if(todoCallback) {
      todoCallback();
    }
    _updateConfirmationState({show: false, text: ''});
  }
};

module.exports = ConfirmationActions;
