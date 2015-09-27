'use strict';

var Dispatcher = require('flux').Dispatcher;

var dispatcher = new Dispatcher();
dispatcher.VIEW_ACTION = 'VIEW_ACTION';
dispatcher.STORE_REFRESH = 'STORE_REFRESH';
dispatcher.SERVER_ACTION = 'SERVER_ACTION';

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
  this.dispatch({source, action});
};

dispatcher.handleViewAction = function(action) {
  this.safeDispatch(this.VIEW_ACTION,action);
};

dispatcher.handleStoreRefreshAction = function(action) {
  this.safeDispatch(this.STORE_REFRESH, action);
};

dispatcher.handleServerAction = function(action) {
  this.safeDispatch(this.SERVER_ACTION, action);
};

module.exports = dispatcher;
