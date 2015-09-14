'use strict';

var React = require('react');
var {Router} = require('react-router');

var routes = require('./routes.react');

React.render(<Router routes={routes}/>, document.getElementById('app-contents'));
