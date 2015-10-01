'use strict';

var $ = require('jquery');

module.exports = (function() {
  var _promises = [];
  function _promiseFulfilled(promiseID, callback) {
    return function(arg1, arg2, arg3) {
      delete _promises[promiseID];
      callback([arg1, arg2, arg3]);
    };
  }

  return function(promiseID, requestSettings) {
    if (!_promises[promiseID]) {
      _promises[promiseID] = new Promise((resolve, reject) => {
        requestSettings.success = _promiseFulfilled(promiseID, resolve);
        requestSettings.error = _promiseFulfilled(promiseID, reject);
        $.ajax(requestSettings);
      });
    }
    return _promises[promiseID];
  };
})();
