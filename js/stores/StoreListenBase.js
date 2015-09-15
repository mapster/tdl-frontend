'use strict';

var assign = require('object-assign');

var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var StoreListenBase = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

module.exports = StoreListenBase;
