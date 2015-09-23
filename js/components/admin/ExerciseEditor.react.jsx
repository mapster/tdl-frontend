'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var {Row,Tabs,Tab} = require('react-bootstrap');

var ExercisePropertyEditor = require('./ExercisePropertyEditor.react');

var ExerciseEditor = React.createClass({
  propTypes: {
    doSaveExercise: PropTypes.func.isRequired,
    doUpdateExercise: PropTypes.func.isRequired,
    properties: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired
  },
  getDefaultProps: function() {
    return {
      properties: {}
    };
  },
  getInitialState: function() {
    return {tab: 'properties'};
  },
  _setExerciseProperties: function(propsChange) {
    var newProps = {properties: Object.assign({}, this.props.properties, propsChange)};
    this.props.doUpdateExercise(newProps);
  },

  render: function() {
    if(!this.props.show) {
      return null;
    }
    return (
      <Row>
        <Tabs position='left' activeKey={this.state.tab} onSelect={(tab) => this.setState({tab})}>
          <Tab eventKey='properties' title='Properties'>
            <ExercisePropertyEditor
                doSaveExercise={this.props.doSaveExercise}
                doUpdateProperties={this._setExerciseProperties}
                {...this.props.properties}
            />
          </Tab>
          <Tab eventKey='sources' title='Sources'>noen kildekode filer</Tab>
        </Tabs>
      </Row>
    );
  }

});

module.exports = ExerciseEditor;
