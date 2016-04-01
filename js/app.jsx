var React = require('react');
var ReactDOM = require('react-dom');
var {Router} = require('react-router');

var routes = require('./routes.react');

ReactDOM.render(<Router routes={routes}/>, document.getElementById('app-contents'));
