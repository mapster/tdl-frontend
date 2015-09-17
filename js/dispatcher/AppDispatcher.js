'use strict';

var Dispatcher = require('flux').Dispatcher;

var dispatcher = new Dispatcher();
dispatcher.VIEW_ACTION = 'VIEW_ACTION';
dispatcher.STORE_REFRESH = 'STORE_REFRESH';

dispatcher.handleViewAction = function(action) {
  this.dispatch({
    source: this.VIEW_ACTION,
    action: action
  });
};

dispatcher.handleStoreRefreshAction = function(action) {
  this.dispatch({
    source: this.STORE_REFRESH,
    action: action
  });
};

module.exports = dispatcher;
