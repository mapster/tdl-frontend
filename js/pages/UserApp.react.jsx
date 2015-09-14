'use strict';

var React = require('react');
var {Grid,Row,Col} = require('react-bootstrap');

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
              {this.props.children}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});

module.exports = App;
