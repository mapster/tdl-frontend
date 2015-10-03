'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ResponseConstants = require('../constants/ResponseConstants');
var Constants = require('../constants/Constants');

//TODO Remove the deprecated functions handleSuccess, handleNotFound, handleError, factory.
var PromiseHandlers = {
  /**
   * @deprecated true
   * (Simple) Function to handle success response from server.
   * Does not distinguish between different kinds of 20x responses.
   * Should be pre-bound with actionType.
   *   *
   * @param  {string} actionType The action type to dispatch.
   * @param  {any} response The data value from ajax success, will be dispatched as data in action.
   */
  handleSuccess: function(actionType, response) {
    AppDispatcher.handleStoreRefreshAction({
      actionType: actionType,
      type: ResponseConstants.OK,
      data: response[0]
    });
    return response;
  },

  /**
   * (Simple) Function to handle not found response from server.
   * Should be pre-bound with targetValue and actionType.
   *
   * @param  {any} targetValue The value to dispatch as data in the action.
   * @param  {string} actionType The action type to dispatch.
   * @param  {jqXHR} response The response from the request.
   */
  handleNotFound: function(targetValue, actionType, response) {
    if (response[0].status == 404) {
      AppDispatcher.handleStoreRefreshAction({
        actionType: actionType,
        data: targetValue
      });
    }
  },

  /**
   * @deprecated true
   * Function to build error message object from server error response.
   *
   * @param  {callback} receiver Called with the generated error object.
   * @param  {jqXHR} response The error response to handle.
   */
  handleError: function(receiver, responses) {
    var response = responses[0];
    switch (response.status) {
      case 400:
      case 409:
        receiver({
          type: ResponseConstants.INVALID_DATA,
          messages: JSON.parse(response.responseText),
          status: response.status
        });
        break;
      case 403:
        receiver({
          type: ResponseConstants.FORBIDDEN,
          status: 403
        });
        break;
      case 404:
        receiver({
          type: ResponseConstants.NOT_FOUND,
          status: 404
        });
        break;
      default:
        receiver({
          type: ResponseConstants.ERROR,
          status: response.status,
          messages: response.responseText
        });
    }
  }
};
/**
* @deprecated true
 * [factory description]
 * @type {Object}
 */
PromiseHandlers.factory = {
  handleSuccess: function(actionType) {
    return PromiseHandlers.handleSuccess.bind(null, actionType);
  },
  handleError: function(receiver) {
    return PromiseHandlers.handleError.bind(null, receiver);
  },
  handleErrorResponse: function(actionType) {
    return PromiseHandlers.handleError.bind(null, (e) => AppDispatcher.handleErrorResponse(Object.assign({}, {actionType}, e)));
  }
};

function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function _doStatusHandler(notificationType, response, status, statusHandler) {
  if(isFunction(statusHandler)) {
    statusHandler(response, status);
  } else if(typeof statusHandler === 'string') {
    AppDispatcher.handleStoreRefreshAction({
      actionType: Constants.NOTIFICATION,
      data: {text: statusHandler, type: notificationType}
    });
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
PromiseHandlers.handlePromise = function(promise, thenProps, catchProps) {
  //assign default values before notification dispatch.
  thenProps = Object.assign({notificationType: 'success'}, thenProps);
  catchProps = Object.assign({notificationType: 'danger'}, catchProps);
  promise
    .then((v) => _doPromise(thenProps, AppDispatcher.handleStoreRefreshAction, v[0], v[2].status))
    .catch((v) => _doPromise(catchProps, AppDispatcher.handleErrorResponse, v[0].responseText, v[0].status));
};

module.exports = PromiseHandlers;
