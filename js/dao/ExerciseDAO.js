'use strict';

var AppConfig = require('../appconfig.json');
var promiseRequest = require('./PromiseRequest');

var GET_EXERCISES = 'getExercises';
var GET_EXERCISE_SOURCES = 'getExerciseSoures';
var GET_SOLUTIONS = 'getSolutions';
var PUT_SOURCE_FILE = 'putSourceFile';
var POST_SOURCE_FILE = 'postSourceFile';

var EXERCISES_URL = AppConfig.Host + '/exercises';
var SOURCE_FILES_RELATIVE_PATH = '/source_files';
var SOLUTIONS_URL = AppConfig.Host + '/users/solutions';

var ExerciseDAO = {
  getExercises: function() {
    return promiseRequest(GET_EXERCISES, {
      type: 'GET',
      url: EXERCISES_URL
    });
  },
  getExerciseSources: function(id) {
    return promiseRequest(GET_EXERCISE_SOURCES+id, {
      type: 'GET',
      url: EXERCISES_URL + '/' + id + SOURCE_FILES_RELATIVE_PATH
    });
  },
  getSolutions: function() {
    return promiseRequest(GET_SOLUTIONS, {
      type: 'GET',
      url: SOLUTIONS_URL
    });
  },
  postSourceFile: function(exerciseId, sourceFile) {
    return promiseRequest(POST_SOURCE_FILE, {
      type: 'POST',
      url: SOLUTIONS_URL + '/' + exerciseId + SOURCE_FILES_RELATIVE_PATH,
      data: JSON.stringify(sourceFile),
      contentType: 'application/json'
    });
  },
  putSourceFile: function(exerciseId, id, sourceFile) {
    return promiseRequest(PUT_SOURCE_FILE, {
      type: 'PUT',
      url: SOLUTIONS_URL + '/' + exerciseId + SOURCE_FILES_RELATIVE_PATH + '/' + id,
      data: JSON.stringify(sourceFile),
      contentType: 'application/json'
    });
  }
};

module.exports = ExerciseDAO;
