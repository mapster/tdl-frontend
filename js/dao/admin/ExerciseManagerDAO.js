'use strict';

var AppConfig = require('../../appconfig.json');
var promiseRequest = require('../PromiseRequest');
var ExerciseDAO = require('../ExerciseDAO');

var DELETE_EXERCISE = 'deleteExercise';
var DELETE_SOURCE_FILE = 'deleteSourceFile';
var POST_EXERCISE = 'postExercise';
var POST_SOURCE_FILE= 'postSourceFile';
var PUT_EXERCISE = 'putExercise';
var PUT_SOURCE_FILE= 'putSourceFile';

var RESOURCE_URL = AppConfig.Host + '/exercises';
var SOURCES_SUB_RESOURCES = 'source_files';

var ExerciseManagerDAO = {
  getExercises: ExerciseDAO.getExercises,
  getExerciseSources: ExerciseDAO.getExerciseSources,
  deleteSourceFile: function(exerciseId, id) {
    return promiseRequest(DELETE_SOURCE_FILE, {
      type: 'DELETE',
      url: RESOURCE_URL + '/' + exerciseId + '/' + SOURCES_SUB_RESOURCES + '/' + id
    });
  },
  deleteExercise: function(id) {
    return promiseRequest(DELETE_EXERCISE, {
      type: 'DELETE',
      url: RESOURCE_URL + '/' + id
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
