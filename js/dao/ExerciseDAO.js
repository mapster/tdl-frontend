'use strict';

var AppConfig = require('../appconfig.json');
var promiseRequest = require('./PromiseRequest');

var GET_EXERCISES = 'getExercises';
var GET_EXERCISE_SOURCES = 'getExerciseSoures';

var RESOURCE_URL = AppConfig.Host + '/exercises';
var SOURCES_SUB_RESOURCES = 'source_files';

var ExerciseDAO = {
  getExercises: function() {
    return promiseRequest(GET_EXERCISES, {
      type: 'GET',
      url: RESOURCE_URL
    });
  },
  getExerciseSources: function(id) {
    return promiseRequest(GET_EXERCISE_SOURCES, {
      type: 'GET',
      url: RESOURCE_URL + '/' + id + '/' + SOURCES_SUB_RESOURCES
    });
  }
};

module.exports = ExerciseDAO;
