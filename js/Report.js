var junitReport = function(junitReport) {
  var {failedTests, failures, runTime, tests} = junitReport;
  var success = failedTests == 0 && failures.length == 0 && true;
  return {
    type: 'junitReport',
    success,
    style: success ? 'success' : 'warning',
    failedTests,
    runTime,
    tests,
    failures,
    toString: function() {
      if(this.success) {
        return 'JUnit tests successful: ' + tests + ' tests.';
      }
      return 'JUnit test result: ' + this.failedTests + ' failed tests, ' + this.tests + ' tests executed';
    }
  };
};

var compilationReport = function(compilationReport) {
  var {entries} = compilationReport;
  return {
    type: 'compilationReport',
    success: entries.length == 0,
    style: 'danger',
    failures: entries,
    toString: function() {
      return 'Compilation failed: ' + this.failures.length + ' errors';
    }
  };
};

var serverErrorReport = function (serverError) {
  return {
    type: 'serverError',
    style: 'danger',
    failures: serverError,
    toString: function() {
      return 'Failed to compile and test: ' + serverError;
    }
  };
};

module.exports = function(report){
  if ('junitReport' in report) {
    return junitReport(report.junitReport);
  } else if ('compilationReport' in report) {
    return compilationReport(report.compilationReport);
  } else {
    return serverErrorReport(report.server_error);
  }
};
