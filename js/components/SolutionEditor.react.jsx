var React = require('react');
var PropTypes = React.PropTypes;
var {Media, Tabs, Tab, Row, Col, Button, Glyphicon} = require('react-bootstrap');

var FailureList = require('./FailureList.react');
var SourcesManager = require('./admin/SourcesManager.react');
var SolveAttempts = require('./SolveAttempts.react');
var SolutionConstants = require('../constants/SolutionEditor');

var SolutionEditor = React.createClass({
  propTypes: {
    doClose: PropTypes.func.isRequired,
    doCreateNewFile: PropTypes.func.isRequired,
    doDeleteSourceFile: PropTypes.func.isRequired,
    doRenameSourceFile: PropTypes.func.isRequired,
    doSaveSourceFile: PropTypes.func.isRequired,
    doSelectExerciseSourceFile: PropTypes.func.isRequired,
    doSelectSolutionSourceFile: PropTypes.func.isRequired,
    doSetEditorTab: PropTypes.func.isRequired,
    doTestSolution: PropTypes.func.isRequired,
    doUpdateSourceFile: PropTypes.func.isRequired,
    exercises: PropTypes.object.isRequired,
    newFileId: PropTypes.number.isRequired,
    properties: PropTypes.object.isRequired,
    selectedExerciseSourceFile: PropTypes.string.isRequired,
    selectedSolutionSourceFile: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    solutions: PropTypes.object.isRequired,
    sourceFiles: PropTypes.object.isRequired,
    tab: PropTypes.string.isRequired
  },
  _tabTitle: function(text, unsaved) {
    if(unsaved) {
      text += '*';
    }
    return text;
  },
  _anyUnsavedFiles: function() {
    var files = this.props.sourceFiles;
    return Object.keys(files).some((f) => files[f]['@unsaved']);
  },
  render: function() {
    if(!this.props.show) {
      return false;
    }
    var exerciseId = this.props.properties.id;
    var exerciseSources = this.props.exercises[exerciseId].sourceFiles || {};
    var solveAttempts = this.props.solutions[exerciseId].solve_attempts || [];
    var lastAttempt = solveAttempts[solveAttempts.length-1] || {};
    return (
      <div>
        <Row>
          <Col lg={3}><Button onClick={() => this.props.doClose(this.props.sourceFiles)}><Glyphicon glyph='arrow-left'/> Back</Button></Col>
          <Col lg={3}><Button onClick={() => this.props.doTestSolution(this.props.properties.id, this.props.sourceFiles)}>Run tests</Button></Col>
        </Row>
        <Row>
          <Col lg={12}>
            <FailureList attempt={lastAttempt}/>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Tabs position='left' activeKey={this.props.tab} onSelect={this.props.doSetEditorTab}>
              <Tab eventKey={SolutionConstants.TAB_SOLUTION_SOURCES} title={this._tabTitle('Solution sources', this.props.properties['@unsaved'])}>
                <SourcesManager
                    doCreateNewFile={() => this.props.doCreateNewFile(this.props.properties.id, this.props.newFileId)}
                    doDeleteSourceFile={this.props.doDeleteSourceFile}
                    doRenameSourceFile={this.props.doRenameSourceFile}
                    doSaveSourceFile={this.props.doSaveSourceFile}
                    doSelectSourceFile={this.props.doSelectSolutionSourceFile}
                    doUpdateSourceFile={this.props.doUpdateSourceFile}
                    selectedSourceFile={this.props.selectedSolutionSourceFile}
                    sourceFiles={this.props.sourceFiles}
                />
              </Tab>
              <Tab eventKey={SolutionConstants.TAB_EXERCISE_SOURCES} title='Exercise sources'>
                <SourcesManager
                    doSelectSourceFile={this.props.doSelectExerciseSourceFile}
                    selectedSourceFile={this.props.selectedExerciseSourceFile}
                    readOnly
                    sourceFiles={exerciseSources}
                />
              </Tab>
            </Tabs>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Media>
              <Media.Body>
                <Media.Heading>Solve Attempts</Media.Heading>
                <SolveAttempts attempts={solveAttempts}/>
              </Media.Body>
            </Media>
          </Col>
        </Row>
      </div>
    );
  }

});

module.exports = SolutionEditor;
