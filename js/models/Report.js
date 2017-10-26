const FailureType = {
  Junit: 'junitFailure',
  Compilation: 'compilationFailure',
};

const Type = {
  Junit: 'junitReport',
  Compilation: 'compilationReport',
  ServerError: 'serverError',
};

function junitFailure(failure) {
  return {
    type: FailureType.Junit,
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
    type: FailureType.Compilation,
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
    type: Type.Junit,
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
    type: Type.Compilation,
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
    type: Type.ServerError,
    style: 'danger',
    text: serverError,
    toString: function() {
      return 'Failed to compile and test: ' + serverError;
    }
  };
}

const Report = (report) => {
  if (report.junitReport) {
    return junitReport(report.junitReport);
  } else if (report.compilationReport) {
    return compilationReport(report.compilationReport);
  } else {
    return serverErrorReport(report.server_error);
  }
};

Report.Type = Type;
Report.FailureType = FailureType;

export default Report;