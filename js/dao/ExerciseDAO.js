'use strict';

var AppConfig = require('../appconfig.json');
var promiseRequest = require('./PromiseRequest');

var GET_EXERCISES = 'getExercises';
var GET_EXERCISE_SOURCES = 'getExerciseSoures';
var GET_SOLUTIONS = 'getSolutions';

var EXERCISES_URL = AppConfig.Host + '/exercises';
var EXERCISE_SOURCE_FILES_URL = '/source_files';
var SOLUTIONS_URL = AppConfig.Host + '/users/solutions';

var ExerciseDAO = {
  getExercises: function() {
    return promiseRequest(GET_EXERCISES, {
      type: 'GET',
      url: EXERCISES_URL
    });
  },
  getExerciseSources: function(id) {
    return promiseRequest(GET_EXERCISE_SOURCES, {
      type: 'GET',
      url: EXERCISES_URL + '/' + id + EXERCISE_SOURCE_FILES_URL
    });
  },
  getSolutions: function() {
    return promiseRequest(GET_SOLUTIONS, {
      type: 'GET',
      url: SOLUTIONS_URL
    });
  }
};

module.exports = ExerciseDAO;
