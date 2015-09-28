'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ResponseConstants = require('../constants/ResponseConstants');

var PromiseHandlers = {
  /**
   * (Simple) Function to handle success response from server.
   * Does not distinguish between different kinds of 20x responses.
   * Should be pre-bound with actionType.
   *
   * @param  {string} actionType The action type to dispatch.
   * @param  {any} response The data value from ajax success, will be dispatched as data in action.
   */
  handleSuccess: function(actionType, response) {
    AppDispatcher.handleStoreRefreshAction({
      actionType: actionType,
      type: ResponseConstants.OK,
      data: response
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
    if (response.status == 404) {
      AppDispatcher.handleStoreRefreshAction({
        actionType: actionType,
        data: targetValue
      });
    }
  },

  /**
   * Function to build error message object from server error response.

   * @param  {callback} receiver Called with the generated error object.
   * @param  {jqXHR} response The error response to handle.
   */
  handleError: function(receiver, response) {
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

module.exports = PromiseHandlers;
