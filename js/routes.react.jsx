'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var App = require('./pages/App.react');
var Stopwatch = require('./pages/Stopwatch.react');

module.exports = (
  <Route handler={App}>
    <Route name="stopwatch" path="/stopwatch" handler={Stopwatch} />
  </Route>
);
