'use strict';

var Dispatcher = require('flux').Dispatcher;

var dispatcher = new Dispatcher();
dispatcher.VIEW_ACTION = 'VIEW_ACTION';
dispatcher.STORE_REFRESH = 'STORE_REFRESH';
dispatcher.SERVER_ACTION = 'SERVER_ACTION';
dispatcher.ERROR_RESPONSE = 'ERROR_RESPONSE';

function error(msg) {
  console.error('AppDispatcher - ' + msg);
  throw new Error(msg);
}

dispatcher.safeDispatch = function(source, action) {
  if(source === undefined){
    error('Undefined source for dispatched action: ' + JSON.stringify(action));
  }
  else if(action === undefined) {
    error('Undefined action dispatched from source: ' + source);
  }
  else if(action.actionType === undefined) {
    error('Undefined actionType from source ' + source + ' for dispatched action: ' + JSON.stringify(action));
  }
  dispatcher.dispatch({source, action});
};

dispatcher.handleViewAction = function(action) {
  dispatcher.safeDispatch(dispatcher.VIEW_ACTION, action);
};

dispatcher.handleStoreRefreshAction = function(action) {
  dispatcher.safeDispatch(dispatcher.STORE_REFRESH, action);
};

dispatcher.handleServerAction = function(action) {
  dispatcher.safeDispatch(dispatcher.SERVER_ACTION, action);
};

dispatcher.handleErrorResponse = function(action) {
  dispatcher.safeDispatch(dispatcher.ERROR_RESPONSE, action);
};

module.exports = dispatcher;
