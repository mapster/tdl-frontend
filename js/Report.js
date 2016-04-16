var junitReport = function(junitReport) {
  var {failedTests, failures, runTime, tests} = junitReport;
  return {
    type: 'junitReport',
    success: failedTests == 0 && failures.length == 0 && runTime == 0 && true,
    failedTests,
    runTime,
    tests,
    failures
  };
};

var compilationReport = function(compilationReport) {
  var {entries} = compilationReport;
  return {
    type: 'compilationReport',
    success: entries.length == 0,
    failures: entries
  };
};

var serverErrorReport = function (serverError) {
  return {
    type: 'serverError',
    failures: serverError
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
