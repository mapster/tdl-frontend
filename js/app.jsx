var React = require('react');
var ReactDOM = require('react-dom');
var {Router,hashHistory} = require('react-router');
require('./debug/EventLogger');

var routes = require('./routes.react');

ReactDOM.render(<Router history={hashHistory} routes={routes}/>, document.getElementById('app-contents'));
