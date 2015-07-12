/*jslint node: true */
'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var App = require('./pages/App.react');
var Stopwatch = require('./pages/Stopwatch.react');
var Editor = require('./pages/Editor.react');
var Exercises = require('./pages/Exercises.react');

module.exports = (
  <Route handler={App}>
    <Route name="stopwatch" path="/stopwatch" handler={Stopwatch} />
    <Route name="exercises" path="/exercises" handler={Exercises} />
    <Route name="editor" path="/editor" handler={Editor} />
  </Route>
);
