'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var {Button,Glyphicon,Row,Col,Tabs,Tab} = require('react-bootstrap');

var ExercisePropertyEditor = require('./ExercisePropertyEditor.react');
var SourcesManager = require('./SourcesManager.react');
var ExerciseManagerConstants = require('../../constants/admin/ExerciseManagerConstants');
var ResponseConstants = require('../../constants/ResponseConstants');

var ExerciseEditor = React.createClass({
  propTypes: {
    alert: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    doClose: PropTypes.func.isRequired,
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
      sourceFiles: {},
      newFilesCounter: 0,
      tab: 'properties'
    };
  },
  _passPropertiesAlerts: function() {
    var alert = this.props.alert;
    if(alert && alert.actionType === ExerciseManagerConstants.SAVE_EXERCISE && alert.type === ResponseConstants.INVALID_DATA) {
      return alert.messages;
    }
    return false;
  },
  _setExerciseProperties: function(propsChange) {
    var newProps = {properties: Object.assign({}, this.props.properties, propsChange)};
    this.props.doUpdateExercise(newProps);
  },
  _setSourceFiles: function(sourceChange) {
    var newSources = Object.assign({}, this.props.sourceFiles, sourceChange);
    this.props.doUpdateExercise(newSources);
  },
  _tabTitle: function(text, isUnSaved) {
    if(isUnSaved) {
      text += '*';
    }
    return text;
  },

  render: function() {
    if(!this.props.show) {
      return null;
    }
    return (
      <Row>
        <Row>
          <Col lg={3}><Button onClick={this.props.doClose}><Glyphicon glyph='arrow-left'/> Back</Button></Col>
        </Row>
        <Row>
          <Tabs position='left' activeKey={this.props.tab} onSelect={(tab) => this.props.doUpdateExercise({tab})}>
            <Tab eventKey='properties' title={this._tabTitle('Properties', this.props.properties._unsaved)}>
              <ExercisePropertyEditor
                  alert={this._passPropertiesAlerts()}
                  doSaveExercise={this.props.doSaveExercise}
                  doChange={this._setExerciseProperties}
                  properties={this.props.properties}
              />
            </Tab>
            {this.props.properties.id && (
              <Tab eventKey='sources' title='Sources'>
                <SourcesManager
                    doChange={this._setSourceFiles}
                    sourceFiles={this.props.sourceFiles}
                    newFilesCounter={this.props.newFilesCounter}
                />
              </Tab>
            )}
          </Tabs>
        </Row>
      </Row>
    );
  }

});

module.exports = ExerciseEditor;
