var AppConfig = require('../appconfig.json');
var promiseRequest = require('./PromiseRequest');
var {handlePromise} = require('../stores/PromiseHandlers');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var DELETE_SOLUTION_SOURCE_FILE = 'deleteSolutionSourceFile';
var GET_EXERCISES = 'getExercises';
var GET_EXERCISE_SOURCES = 'getExerciseSoures';
var GET_SOLUTIONS = 'getSolutions';
var GET_SOLUTION_SOURCES= 'getSolutionSources';
var PUT_SOURCE_FILE = 'putSourceFile';
var POST_SOURCE_FILE = 'postSourceFile';

var EXERCISES_URL = AppConfig.Host + '/exercises';
var SOURCE_FILES_RELATIVE_PATH = '/source_files';
var SOLUTIONS_URL = AppConfig.Host + '/users/solutions';

var ExerciseDAO = {
  deleteSolutionSourceFile: function(file) {
    return handlePromise(promiseRequest(DELETE_SOLUTION_SOURCE_FILE, {
      type: 'DELETE',
      url: SOLUTIONS_URL + '/' + file.exercise_id + SOURCE_FILES_RELATIVE_PATH + '/' + file.id
    }), {
      notificationType: 'info',
      actionType: Constants.SOLUTION_DELETE_SOURCE_FILE,
      default: 'Source file deleted: ' + file.name
    }, {
      403: 'Not authorized to delete source file in exercise: ' + file.name,
      default: 'Something went wrong when deleting source file: ' + file.name
    });
  },
  getExercises: function() {
    return promiseRequest(GET_EXERCISES, {
      type: 'GET',
      url: EXERCISES_URL
    });
  },
  getExerciseSources: function(id) {
    return handlePromise(
      promiseRequest(GET_EXERCISE_SOURCES+id, {
        type: 'GET',
        url: EXERCISES_URL + '/' + id + SOURCE_FILES_RELATIVE_PATH
      }), {
        default: [(r) => AppDispatcher.handleStoreRefreshAction({actionType: Constants.EXERCISE_SOURCES_UPDATE, id, data: r})]
      }, {
        403: 'Not authorized to fetch exercise source files',
        default: (r,s) => 'Could not fetch exercise source files: '+s
      });
  },
  getSolutions: function() {
    return promiseRequest(GET_SOLUTIONS, {
      type: 'GET',
      url: SOLUTIONS_URL
    });
  },
  getSolutionSources: function(id) {
    return handlePromise(promiseRequest(GET_SOLUTION_SOURCES+id, {
      type: 'GET',
      url: SOLUTIONS_URL + '/' + id + SOURCE_FILES_RELATIVE_PATH
    }), {
      default: [(r) => AppDispatcher.handleStoreRefreshAction({actionType: Constants.SOLUTION_SOURCES_UPDATE, id, data: r})]
    }, {
      403: 'Not authorized to fetch solution source files',
      default: (r,s) => 'Could not fetch solution source files: '+s
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
