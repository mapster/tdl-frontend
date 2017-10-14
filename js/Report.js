function junitFailure(failure) {
  return {
    type: 'junitFailure',
    getKey: function () {
      return this.testClassName + '_' + this.testMethodName;
    },
    toString: function () {
      return 'Test failed - ' + this.testClassName + ': ' + this.testMethodName;
    },
    ...failure,
  };
}

function compilationFailure(failure) {
  return {
    type: 'compilationFailure',
    getKey: function () {
      return this.sourceName + '_' + this.lineNumber + '_' + this.columnNumber;
    },
    toString: function () {
      return 'Compilation failed - ' + this.sourceName;
    },
    ...failure,
  };
}

function junitReport(junitReport) {
  const {failedTests, failures, runTime, tests} = junitReport;
  const success = failedTests === 0 && failures.length === 0;
  return {
    type: 'junitReport',
    success,
    style: success ? 'success' : 'warning',
    failedTests,
    runTime,
    tests,
    failures: failures.map(junitFailure),
    toString: function() {
      if(this.success) {
        return 'JUnit tests successful: ' + tests + ' tests.';
      }
      return 'JUnit test result: ' + this.failedTests + ' failed tests, ' + this.tests + ' tests executed';
    }
  };
}

function compilationReport(compilationReport) {
  const {entries} = compilationReport;
  return {
    type: 'compilationReport',
    success: entries.length === 0,
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

export default function (report) {
  if (report.junitReport) {
    return junitReport(report.junitReport);
  } else if (report.compilationReport) {
    return compilationReport(report.compilationReport);
  } else {
    return serverErrorReport(report.server_error);
  }
}
