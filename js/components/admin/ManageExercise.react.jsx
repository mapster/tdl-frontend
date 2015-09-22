'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var {Row,Tabs,Tab} = require('react-bootstrap');

var ExerciseProperties = require('./ExerciseProperties.react');

var ManageExercise = React.createClass({
  propTypes: {
    show: PropTypes.bool.isRequired
  },
  getInitialState: function() {
    return {tab: 'properties'};
  },

  render: function() {
    if(!this.props.show) {
      return null;
    }
    return (
      <Row>
        <Tabs activeKey={this.state.tab} onSelect={(tab) => this.setState({tab})}>
          <Tab eventKey='properties' title='Properties'><ExerciseProperties /></Tab>
          <Tab eventKey='sources' title='Source files'>noen kildekode filer</Tab>
        </Tabs>
      </Row>
    );
  }

});

module.exports = ManageExercise;
