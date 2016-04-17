function junitFailure(f) {
  var r = {
    type: 'junitFailure',
    getKey: function() {
      return this.testClassName + '_' + this.testMethodName;
    },
    toString: function() {
      return 'Test failed - ' + this.testClassName + ': ' + this.testMethodName;
    }
  };
  Object.keys(f).forEach((k) => r[k] = f[k]);
  return r;
}

function compilationFailure(f) {
  var r = {
    type: 'compilationFailure',
    getKey: function() {
      return this.sourceName + '_' + this.lineNumber + '_' + this.columnNumber;
    },
    toString: function() {
      return 'Compilation failed - ' + this.sourceName;
    }
  };
  Object.keys(f).forEach((k) => r[k] = f[k]);
  return r;
}

function junitReport(junitReport) {
  var {failedTests, failures, runTime, tests} = junitReport;
  var success = failedTests == 0 && failures.length == 0 && true;
  return {
    type: 'junitReport',
    success,
    style: success ? 'success' : 'warning',
    failedTests,
    runTime,
    tests,
    failures: failures.map((f) => junitFailure(f)),
    toString: function() {
      if(this.success) {
        return 'JUnit tests successful: ' + tests + ' tests.';
      }
      return 'JUnit test result: ' + this.failedTests + ' failed tests, ' + this.tests + ' tests executed';
    }
  };
}

function compilationReport(compilationReport) {
  var {entries} = compilationReport;
  return {
    type: 'compilationReport',
    success: entries.length == 0,
    style: 'danger',
    failures: entries.map((f) => compilationFailure(f)),
    toString: function() {
      return 'Compilation failed: ' + this.failures.length + ' errors';
    }
  };
}

function serverErrorReport(serverError) {
  return {
    type: 'serverError',
    style: 'danger',
    failures: serverError,
    toString: function() {
      return 'Failed to compile and test: ' + serverError;
    }
  };
}

module.exports = function(report){
  if ('junitReport' in report) {
    return junitReport(report.junitReport);
  } else if ('compilationReport' in report) {
    return compilationReport(report.compilationReport);
  } else {
    return serverErrorReport(report.server_error);
  }
};
