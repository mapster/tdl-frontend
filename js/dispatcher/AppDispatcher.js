/*jslint node: true */
'use strict';

var Dispatcher = require('flux').Dispatcher;

var dispatcher = new Dispatcher();
dispatcher.handleViewAction = function(action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

dispatcher.handleStoreRefreshAction = function(action) {
  this.dispatch({
    source: 'STORE_REFRESH',
    action: action
  });
};

module.exports = dispatcher;
