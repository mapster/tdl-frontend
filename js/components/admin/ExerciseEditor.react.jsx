'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var {Row,Tabs,Tab} = require('react-bootstrap');

var ExercisePropertyEditor = require('./ExercisePropertyEditor.react');
var SourcesManager = require('./SourcesManager.react');

var ExerciseEditor = React.createClass({
  propTypes: {
    doSaveExercise: PropTypes.func.isRequired,
    doUpdateExercise: PropTypes.func.isRequired,
    newFilesCounter: PropTypes.number.isRequired,
    properties: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    sourceFiles: PropTypes.object.isRequired,
    sourceTab: PropTypes.string,
    tab: PropTypes.string
  },
  getDefaultProps: function() {
    return {
      properties: {},
      sourceFiles: {},
      newFilesCounter: 0,
      tab: 'properties'
    };
  },
  _setExerciseProperties: function(propsChange) {
    var newProps = {properties: Object.assign({}, this.props.properties, propsChange)};
    this.props.doUpdateExercise(newProps);
  },
  _setSourceFiles: function(sourceChange) {
    var newSources = Object.assign({}, this.props.sourceFiles, sourceChange);
    this.props.doUpdateExercise(newSources);
  },

  render: function() {
    if(!this.props.show) {
      return null;
    }
    return (
      <Row>
        <Tabs position='left' activeKey={this.props.tab} onSelect={(tab) => this.props.doUpdateExercise({tab})}>
          <Tab eventKey='properties' title='Properties'>
            <ExercisePropertyEditor
                doSaveExercise={this.props.doSaveExercise}
                doUpdateProperties={this._setExerciseProperties}
                {...this.props.properties}
            />
          </Tab>
          <Tab eventKey='sources' title='Sources'>
            <SourcesManager
                doChange={this._setSourceFiles}
                sourceFiles={this.props.sourceFiles}
                newFilesCounter={this.props.newFilesCounter}
            />
          </Tab>
        </Tabs>
      </Row>
    );
  }

});

module.exports = ExerciseEditor;
