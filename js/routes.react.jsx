'use strict';

var React = require('react');
var {Route} = require('react-router');

var App = require('./pages/App.react');
var Editor = require('./pages/Editor.react');
var Exercises = require('./pages/Exercises.react');
var AdminApp = require('./pages/admin/AdminApp.react');
var UserApp = require('./pages/UserApp.react');

module.exports = (
  <Route component={App}>
    <Route path="/admin" component={AdminApp} />
    <Route path="/" component={UserApp}>
      <Route path="exercises" component={Exercises} />
      <Route path="editor" component={Editor} />
    </Route>
  </Route>
);
