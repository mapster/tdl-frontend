'use strict';

var AppConfig = require('../../appconfig.json');
var promiseRequest = require('../PromiseRequest');

var POST_EXERCISE = 'postExercise';

var RESOURCE_URL = AppConfig.Host + '/exercises';

var ExerciseManagerDAO = {
  postExercise: function(exercise) {
    return promiseRequest(POST_EXERCISE, {
      type: 'POST',
      url: RESOURCE_URL,
      data: JSON.stringify(exercise),
      contentType: 'application/json'
    });
  }
};

module.exports = ExerciseManagerDAO;
