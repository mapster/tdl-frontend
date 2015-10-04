'use strict';

var AppConfig = require('../../appconfig.json');
var promiseRequest = require('../PromiseRequest');

var GET_EXERCISES = 'getExercises';
var GET_EXERCISE_SOURCES = 'getExerciseSoures';
var POST_EXERCISE = 'postExercise';
var POST_SOURCE_FILE= 'postSourceFile';
var PUT_EXERCISE = 'putExercise';
var PUT_SOURCE_FILE= 'putSourceFile';

var RESOURCE_URL = AppConfig.Host + '/exercises';
var SOURCES_SUB_RESOURCES = 'source_files';

var ExerciseManagerDAO = {
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
  },
  postExercise: function(exercise) {
    return promiseRequest(POST_EXERCISE, {
      type: 'POST',
      url: RESOURCE_URL,
      data: JSON.stringify(exercise),
      contentType: 'application/json'
    });
  },
  postSourceFile: function(exerciseId, sourceFile) {
    return promiseRequest(POST_SOURCE_FILE, {
      type: 'POST',
      url: RESOURCE_URL + '/' + exerciseId + '/' + SOURCES_SUB_RESOURCES,
      data: JSON.stringify(sourceFile),
      contentType: 'application/json'
    });
  },
  putExercise: function(id, exercise) {
    return promiseRequest(PUT_EXERCISE, {
      type: 'PUT',
      url: RESOURCE_URL + '/' + id,
      data: JSON.stringify(exercise),
      contentType: 'application/json'
    });
  },
  putSourceFile: function(exerciseId, id, sourceFile) {
    return promiseRequest(PUT_SOURCE_FILE, {
      type: 'PUT',
      url: RESOURCE_URL + '/' + exerciseId + '/' + SOURCES_SUB_RESOURCES + '/' + id,
      data: JSON.stringify(sourceFile),
      contentType: 'application/json'
    });
  }
};

module.exports = ExerciseManagerDAO;
