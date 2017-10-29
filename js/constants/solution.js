const status = {
  serverError: 'server_error',
  compilationError: 'compilation_error',
  junitFailure: 'junit_failure',
  success: 'success',
};

const statusStyle = {
  [status.serverError]: 'danger',
  [status.compilationError]: 'danger',
  [status.junitFailure]: 'warning',
  [status.success]: 'success',
};

const statusText = {
  [status.serverError]: 'Server error',
  [status.compilationError]: 'Compilation error(s)',
  [status.junitFailure]: 'Test failure(s)',
  [status.success]: '',
};

export default {
  status, statusStyle, statusText
}