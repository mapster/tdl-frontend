/*jslint node: true */
'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var App = require('./pages/App.react');
var Editor = require('./pages/Editor.react');
var Exercises = require('./pages/Exercises.react');
var AdminApp = require('./pages/admin/AdminApp.react');
var UserApp = require('./pages/UserApp.react');

module.exports = (
  <Route handler={App}>
    <Route name="adminapp" path="/admin" handler={AdminApp} />
    <Route name="userapp" handler={UserApp} path="/">
      <Route name="exercises" path="exercises" handler={Exercises} />
      <Route name="editor" path="editor" handler={Editor} />
    </Route>
  </Route>
);
