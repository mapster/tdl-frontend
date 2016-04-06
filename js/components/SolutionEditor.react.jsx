var React = require('react');
var PropTypes = React.PropTypes;
var {Row, Col, Button, Glyphicon} = require('react-bootstrap');

var SourcesManager = require('./admin/SourcesManager.react');

var SolutionEditor = React.createClass({
  propTypes: {
    doClose: PropTypes.func.isRequired,
    doCreateNewFile: PropTypes.func.isRequired,
    doDeleteSourceFile: PropTypes.func.isRequired,
    doRenameSourceFile: PropTypes.func.isRequired,
    doSaveSourceFile: PropTypes.func.isRequired,
    doSelectSourceFile: PropTypes.func.isRequired,
    doUpdateSourceFile: PropTypes.func.isRequired,
    newFileId: PropTypes.number.isRequired,
    properties: PropTypes.object.isRequired,
    selectedSourceFile: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    sourceFiles: PropTypes.object.isRequired
  },
  render: function() {
    if(!this.props.show) {
      return false;
    }
    return (
      <div>
        <Row>
          <Col lg={3}><Button onClick={() => this.props.doClose(this.props.sourceFiles)}><Glyphicon glyph='arrow-left'/> Back</Button></Col>
        </Row>
        <Row>
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
        </Row>
      </div>
    );
  }

});

module.exports = SolutionEditor;
