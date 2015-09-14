'use strict';

var React = require('react');
var Router = require('react-router');
var {Grid,Row,Col} = require('react-bootstrap');

var RouteHandler = Router.RouteHandler;
var Header = require('../components/Header.react');

function _getState() {
  return {
  };
}

var App = React.createClass({
  getInitialState: function() {
    return _getState();
  },
  componentDidMount: function() {
  },
  componentWillUnmount: function() {
  },
  render: function() {
    return (
      <div className='container'>
        <Grid>
          <Row>
            <Col lg={12}>
              <Header session={this.props.session} />
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
