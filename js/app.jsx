'use strict';

var React = require('react');
var Router = require('react-router');

var routes = require('./routes.react');

Router.run(routes, function (Handler) {
  console.log("i router");

  React.render(<Handler />, document.getElementById('app-contents'), function() {
    console.log("rendered?");
  });
});
