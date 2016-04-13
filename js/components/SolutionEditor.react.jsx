var React = require('react');
var PropTypes = React.PropTypes;
var {Tabs, Tab, Row, Col, Button, Glyphicon} = require('react-bootstrap');

var SourcesManager = require('./admin/SourcesManager.react');
var SolutionConstants = require('../constants/SolutionEditor');

var SolutionEditor = React.createClass({
  propTypes: {
    doClose: PropTypes.func.isRequired,
    doCreateNewFile: PropTypes.func.isRequired,
    doDeleteSourceFile: PropTypes.func.isRequired,
    doRenameSourceFile: PropTypes.func.isRequired,
    doSaveSourceFile: PropTypes.func.isRequired,
    doSelectSourceFile: PropTypes.func.isRequired,
    doSetEditorTab: PropTypes.func.isRequired,
    doTestSolution: PropTypes.func.isRequired,
    doUpdateSourceFile: PropTypes.func.isRequired,
    newFileId: PropTypes.number.isRequired,
    properties: PropTypes.object.isRequired,
    selectedSourceFile: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
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
    return (
      <div>
        <Row>
          <Col lg={3}><Button onClick={() => this.props.doClose(this.props.sourceFiles)}><Glyphicon glyph='arrow-left'/> Back</Button></Col>
          <Col lg={3}><Button onClick={() => this.props.doTestSolution(this.props.properties.id, this.props.sourceFiles)}>Run tests</Button></Col>
        </Row>
        <Row>
          <Tabs position='left' activeKey={this.props.tab} onSelect={this.props.doSetEditorTab}>
            <Tab eventKey={SolutionConstants.TAB_SOLUTION_SOURCES} title={this._tabTitle('Solution sources', this.props.properties['@unsaved'])}>
              <SourcesManager
                  doCreateNewFile={() => this.props.doCreateNewFile(this.props.properties.id, this.props.newFileId)}
                  doDeleteSourceFile={this.props.doDeleteSourceFile}
                  doRenameSourceFile={this.props.doRenameSourceFile}
                  doSaveSourceFile={this.props.doSaveSourceFile}
                  doSelectSourceFile={this.props.doSelectSourceFile}
                  doUpdateSourceFile={this.props.doUpdateSourceFile}
                  selectedSourceFile={this.props.selectedSourceFile}
                  sourceFiles={this.props.sourceFiles}
              />
            </Tab>
            <Tab eventKey={SolutionConstants.TAB_EXERCISE_SOURCES} title='Exercise sources'>
              <div>hello</div>
            </Tab>
          </Tabs>
        </Row>
      </div>
    );
  }

});

module.exports = SolutionEditor;
