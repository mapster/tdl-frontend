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
    doClose: PropTypes.func.isRequired,
    doCreateNewFile: PropTypes.func.isRequired,
    doResetExerciseProperties: PropTypes.func.isRequired,
    doSaveExerciseProperties: PropTypes.func.isRequired,
    doSaveSourceFile: PropTypes.func.isRequired,
    doSelectSourceFile: PropTypes.func.isRequired,
    doSetEditorTab: PropTypes.func.isRequired,
    doUpdateExerciseProperties: PropTypes.func.isRequired,
    doUpdateSourceFile: PropTypes.func.isRequired,
    feedback: PropTypes.object.isRequired,
    newFileId: PropTypes.number.isRequired,
    origProperties: PropTypes.object.isRequired,
    properties: PropTypes.object.isRequired,
    selectedSourceFile: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    sourceFiles: PropTypes.object.isRequired,
    tab: PropTypes.string,

    alert: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
  },
  _passPropertiesAlerts: function() {
    var alert = this.props.alert;
    if(alert && alert.actionType === ExerciseManagerConstants.SAVE_EXERCISE && alert.type === ResponseConstants.INVALID_DATA) {
      return alert.messages;
    }
    return false;
  },
  _tabTitle: function(text, isSaved) {
    if(!isSaved) {
      text += '*';
    }
    return text;
  },
  _anyUnsavedFiles: function() {
    return Object.keys(this.props.sourceFiles).some((f) => this.props.sourceFiles[f]['@unsaved']);
  },

  render: function() {
    if(!this.props.show) {
      return false;
    }
    return (
      <Row>
        <Row>
          <Col lg={3}><Button onClick={this.props.doClose}><Glyphicon glyph='arrow-left'/> Back</Button></Col>
        </Row>
        <Row>
          <Tabs position='left' activeKey={this.props.tab} onSelect={this.props.doSetEditorTab}>
            <Tab eventKey='properties' title={this._tabTitle('Properties', this.props.properties['@saved'])}>
              <ExercisePropertyEditor
                  alert={this._passPropertiesAlerts()}
                  doChange={this.props.doUpdateExerciseProperties}
                  doReset={() => this.props.doResetExerciseProperties(this.props.origProperties)}
                  doSaveExercise={this.props.doSaveExerciseProperties}
                  properties={this.props.properties}
                  feedback={this.props.feedback}
              />
            </Tab>
            {this.props.properties.id && (
              <Tab eventKey='sources' title={this._tabTitle('Sources', !this._anyUnsavedFiles())}>
                <SourcesManager
                    doCreateNewFile={() => this.props.doCreateNewFile(this.props.newFileId)}
                    doSaveSourceFile={this.props.doSaveSourceFile}
                    doSelectSourceFile={this.props.doSelectSourceFile}
                    doUpdateSourceFile={this.props.doUpdateSourceFile}
                    selectedSourceFile={this.props.selectedSourceFile}
                    sourceFiles={this.props.sourceFiles}
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
