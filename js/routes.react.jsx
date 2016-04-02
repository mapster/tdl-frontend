var React = require('react');
var {Route} = require('react-router');

var App = require('./pages/App.react');

var AdminApp = require('./pages/admin/AdminApp.react');
var UserAdmin = require('./pages/admin/UserAdmin.react');
var ExerciseManager = require('./pages/admin/ExerciseManager.react');

var UserApp = require('./pages/UserApp.react');
var Editor = require('./pages/Editor.react');
var Exercises = require('./pages/Exercises.react');

module.exports = (
  <Route component={App}>
    <Route path="/admin" component={AdminApp}>
      <Route path="users" component={UserAdmin}/>
      <Route path="exercises" component={ExerciseManager} />
    </Route>
    <Route path="/" component={UserApp}>
      <Route path="exercises" component={Exercises} />
      <Route path="editor" component={Editor} />
    </Route>
  </Route>
);
