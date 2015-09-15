'use strict';

var React = require('react');
var {PropTypes} = React;
var {Grid,Row,Col} = require('react-bootstrap');

var Header = require('../components/Header.react');

var UserApp = React.createClass({
  propTypes: {
    children: PropTypes.node,
    session: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
  },
  render: function() {
    var menu= [
      {href: '#/exercises', text: 'Exercises'},
      {href: '#/editor', text: 'Editor'}
    ];
    return (
      <div className='container'>
        <Grid>
          <Row>
            <Col lg={12}>
              <Header title='JavaTDL' menu={menu} session={this.props.session} />
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

module.exports = UserApp;
