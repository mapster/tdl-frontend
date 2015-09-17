'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');

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
      data: response
    });
  },

  /**
   * (Simple) Function to handle not found response from server.
   * Should be pre-bound with targetValue and actionType. this is not used.
   *
   * @param  {any} targetValue The value to dispatch as data in the action.
   * @param  {string} actionType The action type to dispatch.
   * @param  {jqXHR} response The response from the request.
   */
  handleNotFound: function(targetValue, actionType, response) {
    if (response.status == 404) {
      AppDispatcher.handleStoreRefreshAction({
        actionType: actionType,
        data: []
      });
    }
  }
};

module.exports = PromiseHandlers;
