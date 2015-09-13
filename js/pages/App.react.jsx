'use strict';

var React = require('react');
var Router = require('react-router');
var {Grid,Row,Col} = require('react-bootstrap');

var SessionStore = require('../stores/SessionStore');
var RouteHandler = Router.RouteHandler;
var Header = require('../components/Header.react');

function _getState() {
  return {
    session: SessionStore.getSession()
  };
}

function _onChange(store, callback) {
  var stateChange = {};
  stateChange[store] = callback();
  this.setState(stateChange);
}

var App = React.createClass({
  _listeners: {},
  getInitialState: function() {
    return _getState();
  },
  componentDidMount: function() {
    this._listeners.session = _onChange.bind(this, 'session', SessionStore.getSession);
    SessionStore.addChangeListener(this._listeners.session);
  },
  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._listeners.session);
  },
  render: function() {
    return (
      <div className='container'>
        <Grid>
          <Row>
            <Col lg={12}>
              <Header session={this.state.session} />
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <RouteHandler />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});

module.exports = App;
