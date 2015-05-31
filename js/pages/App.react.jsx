/*jslint node: true */
'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render: function() {
    return (
      <div className="container">
        <h1>Velkommen</h1>
        <RouteHandler />
      </div>
    );
  }
});

module.exports = App;
