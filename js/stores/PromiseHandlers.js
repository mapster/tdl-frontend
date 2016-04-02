'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var NotificationActions = require('../actions/NotificationActions');

function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function _doStatusHandler(notificationType, response, status, statusHandler) {
  if(isFunction(statusHandler)) {
    statusHandler(response, status);
  } else if(typeof statusHandler === 'string') {
    NotificationActions.dispatchNotification(statusHandler, notificationType);
  } else {
    throw new Error('promiseHandler: Invalid value in status-case');
  }
}

function _doPromise(props, doDispatch, response, status) {
  if(props) {
    var actionType = props.actionType;
    if(actionType) {
      doDispatch({actionType, data: response});
    }
    if(props.callbacks) {
      props.callbacks.forEach((cb) => cb(response, status));
    }

    var statusHandler = props.default;
    if(props.hasOwnProperty(status)){
      statusHandler = props[status];
    }
    if(statusHandler){
      var _handler = _doStatusHandler.bind(null, props.notificationType, response, status);
      if(Array.isArray(statusHandler)) {
        statusHandler.forEach((h) => _handler(h));
      } else {
        _handler(statusHandler);
      }
    }
  }
}

/**
 * Generic promise handler.
 * Declare actions for success and error in thenProps and catchProps.
 *
 * The props objects can have the following properties:
 * actionType, switch-cases for responseStatus, notificationType, and callbacks.
 *
 * The actionType causes a handleStoreRefreshAction dispatch for success,
 * and a handleErrorResponse dispatch for error.
 *
 * The switch-cases may be a single value, or an array of values. The value
 * types allowed are string and function. If the value is a string, it will
 * be dispatched as a notification with the notificationType given in the props.
 * If it is a function it will be invoked with response and responseStatus as
 * arguments.
 *
 * The notificationType is the type associated with notification dispatches.
 * The default values for success and error are 'success' and 'danger.
 *
 * The functions in callbacks will be invoked with response and responseStatus as
 * arguments.
 *
 * @param  {Promise} promise    Promised ajax request (produced by dao/promiseRequest).
 * @param  {Object} thenProps  Properties for success scenario.
 * @param  {Object} catchProps Properties for error scenario.
 */
var PromiseHandlers = {
  handlePromise: function(promise, thenProps, catchProps) {
    //assign default values before notification dispatch.
    thenProps = Object.assign({notificationType: 'success'}, thenProps);
    catchProps = Object.assign({notificationType: 'danger'}, catchProps);
    promise
      .then((v) => _doPromise(thenProps, AppDispatcher.handleStoreRefreshAction, v[0], v[2].status))
      .catch((v) => _doPromise(catchProps, AppDispatcher.handleErrorResponse, v[0].responseText, v[0].status));

    // TODO: catch is incorrectly used to process error responses. The then callback will be invoked no matter what
    // the response is. If it fails with a thrown error, then catch callback is invoked. thenProps and catchProps will
    // need to be merged.
    console.log("TODO: fix catch in PromiseHandlers.");
  }
};

module.exports = PromiseHandlers;
