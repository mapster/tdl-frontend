var constants = [
  // EXERCISES
  'EXERCISES_UPDATE',
  'SOLUTIONS_UPDATE',
  'UPDATE_EDIT_EXERCISE_STATE',
  // NOTIFICATION
  'NOTIFICATION',
  'SET_CONFIRMATION',
  // USER
  'USER_UPDATE',
  'USER_AUTH_UPDATE',
  // USER SESSION
  'SESSION_UPDATE',
  'LOGIN',
  'LOGOUT'
];

var obj = {};
constants.forEach(function (c) {
  if(obj[c] !== undefined) {
    throw new Error('Constants.js defines duplicate constant: ' + c);
  } else {
    obj[c] = c;
  }
});

module.exports = obj;
