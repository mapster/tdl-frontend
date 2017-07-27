var $ = {};
var PromiseLogger = require('../debug/PromiseLogger');

var _promises = {};

function _promiseFulfilled(promiseID, callback) {
  return function(arg1, arg2, arg3) {
    delete _promises[promiseID];
    callback([arg1, arg2, arg3]);
  };
}

module.exports = function(promiseID, requestSettings) {
    if (!_promises[promiseID]) {
      _promises[promiseID] = new Promise((resolve, reject) => {
        requestSettings.success = _promiseFulfilled(promiseID, resolve);
        requestSettings.error = _promiseFulfilled(promiseID, reject);
        $.ajax(requestSettings);
      });
      PromiseLogger.added(promiseID, _promises);
    } else {
      PromiseLogger.skipped(promiseID, _promises);
    }
    return _promises[promiseID];
  };
